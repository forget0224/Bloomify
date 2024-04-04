import { useState, useEffect } from 'react'
import GameComponent from '@/components/intro/GameComponent'
import styles from './game.module.css'

export default function Game() {
  return (
    <>
      {/* 遊戲 index.html */}
      <div className={styles.game}>
        <GameComponent />
        <div className="tip">click and start</div>
        {/* 其他卡片 */}
        {[...Array(44).keys()].map(index => (
          <div key={index} className={`card card${index + 1}`}>
            <div className="content">
              <div className="front" />
              <div className="back" style={{ maxWidth: '100%', maxHeight: '100%' }}>
                <img src="" alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
