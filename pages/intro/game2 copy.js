// 這是原本遊戲 index.html的head

//TODO:
{
  /* <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="./css/index.css" />
  <title>發牌、選牌與翻牌動態</title> */
}

import { useState, useEffect } from 'react'
import GameComponent from '@/components/intro/GameComponent'
// import * as gamejs from './gamejs.js'
import styles from './game.module.css'

// import DefaultLayout from '@/components/layout/default-layout'
// import styles from '../custom/custom.module.css'
// import Image from 'next/image'
// import bannerFlower from '@/assets/banner-flower.jpg'
export default function Game() {
  // const [activePage, setActivePage] = useState('custom')
  return (
    // <DefaultLayout activePage={activePage}>

    <>
      {/* main的東西 */}
      {/* 遊戲 index.html */}
      <div className={styles.game}>
      <GameComponent <div className="tip">click and start</div>
        <div className="card card1">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card2">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card3">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card4">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card5">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card6">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card7">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card8">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card9">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card10">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card11">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card12">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card13">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card14">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card15">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card16">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card17">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card18">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card19">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card20">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card21">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card22">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card23">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card24">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card25">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card26">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card27">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card28">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card29">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card30">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card31">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card32">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card33">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card34">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card35">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card36">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card37">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card38">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card39">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card40">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card41">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card42">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card43">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div>
        <div className="card card44">
          <div className="content">
            <div className="front" />
            <div
              className="back"
              style={{ maxWidth: '100%', maxHeight: '100%' }}
            >
              <img
                src=""
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        </div> />
      </div>
    </>
  )
}
