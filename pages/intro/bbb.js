import React, { useState, useEffect } from 'react'
import style from '@/pages/intro/index.module.css'
function Game() {
  const [canClick, setCanClick] = useState(true)
  const [canSelect, setCanSelect] = useState(false)
  const [finished, setFinished] = useState(false)
  const [pickAry, setPickAry] = useState([])
  const [tip, setTip] = useState('click and start')

  useEffect(() => {
    const body = document.querySelector('body')
    const tipDiv = document.querySelector('.game .tip')

    body.addEventListener('click', async () => {
      console.log(canClick, finished)
      if (!canClick) return false
      if (finished) {
        reset()
        return false
      }
      setTip('Shuffling')
      let cardNum = getRandomNumbers(1, 10, 10)
      for (let i = 0; i < cardNum.length; i++) {
        document.querySelector(`.card${cardNum[i]} .back`).innerHTML = ''
        document
          .querySelector(`.card${cardNum[i]} .back`)
          .setAttribute('text', `Back!${i + 1}`)
        let ran = Math.round(Math.random() * 2)
        console.log(ran)
        if (ran === 0) {
          document
            .querySelector(`.card${cardNum[i]} .back`)
            .classList.add('reversed')
        }
      }
      setCanClick(false)
      for (let i = 1; i <= 10; i++) {
        document.querySelector(`.card${i}`).classList.add(`card${i}Active`)
      }
      setTip('pick up the 1st card')
      setCanSelect(true)
    })

    for (let i = 1; i <= 10; i++) {
      document.querySelector(`.card${i}`).addEventListener('click', (e) => {
        if (canSelect) {
          setCanSelect(false)
          setPickAry([...pickAry, i])
          playSelection()
        }
      })
    }

    return () => {
      body.removeEventListener('click', () => {})
    }
  }, [canClick, canSelect, finished, pickAry])

  async function reset() {
    setTip('')
    setCanClick(false)
    for (let i = pickAry.length - 1; i >= 0; i--) {
      document
        .querySelector(`.card${pickAry[i]} .content`)
        .classList.remove('active')
      await waitings(300)
      document
        .querySelector(`.card${pickAry[i]}`)
        .classList.remove(`forward${i + 1}2`)
      await waitings(300)
      document
        .querySelector(`.card${pickAry[i]}`)
        .classList.remove(`forward${i + 1}`)
      document
        .querySelector(`.card${pickAry[i]}`)
        .classList.add(`card${pickAry[i]}Active`)
      await waitings(300)
    }

    await waitings(500)
    for (let i = 1; i <= 10; i++) {
      document.querySelector(`.card${i}`).classList.remove(`card${i}Active`)
      document.querySelector(`.card${i} .back`).classList.remove('reversed')
    }
    await waitings(1000)
    setTip('click and start')
    setCanClick(true)
    setCanSelect(false)
    setFinished(false)
    setPickAry([])
  }

  async function playSelection() {
    let pickNum = pickAry.length - 1
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.remove(`card${pickAry[pickNum]}pickup`)
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.remove(`card${pickAry[pickNum]}Active`)
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.add(`forward${pickAry.length}`)
    await waitings(300)
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.add(`forward${pickAry.length}2`)
    await waitings(300)
    document
      .querySelector(`.card${pickAry[pickNum]} .content`)
      .classList.add('active')
    await waitings(1000)
    if (pickAry.length < 3) {
      if (pickAry.length === 1) {
        setTip('pick up the 2nd card')
      } else if (pickAry.length === 2) {
        setTip('pick up the 3rd card')
      }
      setCanSelect(true)
    } else {
      setTip('click and restart')
      setCanClick(true)
      setFinished(true)
    }
  }

  function waitings(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }

  function getRandomNumbers(start, end, count) {
    const numbers = Array.from({ length: end - start + 1 }, (v, i) => i + start)
    const result = []
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length)
      result.push(numbers[randomIndex])
      numbers.splice(randomIndex, 1)
    }
    return result
  }

  return (
    <div className="game">
      <div className="tip">{tip}</div>
      {[...Array(10)].map((_, index) => (
        <div key={index + 1} className={`card card${index + 1}`}>
          <div className="content">
            <div className="front"></div>
            <div className="back"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Game
