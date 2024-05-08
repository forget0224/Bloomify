import React, { useState, useRef, useCallback, useEffect } from 'react'
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
} from '@react-google-maps/api'
import { useFlowerCart } from '@/hooks/use-flowerCart'
import { useMediaQuery } from 'react-responsive'

export default function CustomGoogleMap({ destination, setDeliveryShipping }) {
  console.log(destination)
  const isDesktop = useMediaQuery({ minWidth: 1024 })

  const mapContainerStyle = {
    height: isDesktop ? '400px' : '269px',
    width: isDesktop ? '400px' : '269px',
  }

  const { state } = useFlowerCart()
  const origin = state.store_address
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [fee, setFee] = useState(0)
  const [directions, setDirections] = useState(null)
  const [lastDestination, setLastDestination] = useState('')
  const mapRef = useRef(null)

  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])
  const [center, setCenter] = useState({
    lat: 25.0329694,
    lng: 121.5654177,
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      })
    } else {
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])
  const extractCity = (destination) => {
    const cityRegex = /(.+市)/
    const match = destination.match(cityRegex)
    return match ? match[1] : null
  }

  const calculateFees = (city, distanceInKm, fee) => {
    if (city === '台中市') {
      if (distanceInKm <= 2) {
        fee = 68
      } else if (distanceInKm > 2 && distanceInKm <= 6) {
        fee = 68 + (distanceInKm - 2) * 12
      } else {
        fee = 116 + (distanceInKm - 6) * 14
      }
    } else {
      if (distanceInKm <= 1) {
        fee = 75
      } else if (distanceInKm > 1 && distanceInKm <= 3) {
        fee = 75 + (distanceInKm - 1) * 10
      } else {
        fee = 95 + (distanceInKm - 3) * 15
      }
    }
    return fee
  }

  const directionsCallback = useCallback(
    (response, status) => {
      if (status === 'OK' && destination !== lastDestination) {
        setDirections(response)
        const distanceInMeters = response.routes[0].legs[0].distance.value
        const distanceInKm = distanceInMeters / 1000
        const durationText = response.routes[0].legs[0].duration.text
        setDistance(`${distanceInKm.toFixed(2)} km`)
        setDuration(durationText)
        const newFee = calculateFees(
          extractCity(destination),
          distanceInKm,
          fee
        )
        setFee(newFee)
        setLastDestination(destination)
        setDeliveryShipping(newFee)
      } else if (status !== 'OK') {
        console.error(`Directions request failed due to ${status}`)
      }
    },
    [destination, lastDestination, setDeliveryShipping, fee]
  )

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      onLoad={onMapLoad}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      >
        {destination && (
          <DirectionsService
            options={{
              destination: destination,
              origin: origin,
              travelMode: 'DRIVING',
            }}
            callback={directionsCallback}
          />
        )}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              directions: directions,
              polylineOptions: {
                strokeColor: '#68A392', // courses's color
                strokeWeight: 4,
              },
            }}
          />
        )}
      </GoogleMap>
      <div className="sm:w-[400px] w-[269px] mt-4">
        <div className="flex flex-row justify-between">
          <div>距離 </div>
          <div>{distance}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div>預估時間</div>
          <div>{duration}</div>
        </div>
        <div className="flex flex-row justify-between">
          <div>運費</div>
          <div>${fee.toFixed(0)}</div>
        </div>
      </div>
    </LoadScript>
  )
}
