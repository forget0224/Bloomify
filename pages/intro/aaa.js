import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import styles from '../custom/custom.module.css'
import Image from 'next/image'
import bannerFlower from '@/assets/banner-flower.jpg'
import { Card, CardBody, CardFooter } from '@nextui-org/react'

import game from 'index.css'
//import {Image} from "@nextui-org/react";
export default function Intro() {
    
  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div className="game">
            <div className="tip">click and start</div>
            <div className="card card1">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card2">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card3">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card4">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card5">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card6">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card7">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card8">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card9">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
            <div className="card card10">
              <div className="content">
                <div className="front"></div>
                <div className="back"></div>
              </div>
            </div>
          </div>
        </>
      }
    </DefaultLayout>
  )
}
