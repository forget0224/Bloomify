import { useState } from 'react'
import DefaultLayout from '@/components/layout/default-layout'
import styles from './flowers.module.css'
export default function Intro() {
  const [activePage, setActivePage] = useState('intro')

  return (
    <DefaultLayout activePage={activePage}>
      {
        <>
          <div id="menu" className="big-bg">
            <header className="page-header wrapper">
              <h1>
                <a href="index.html">
                  <img
                    className="logo"
                    src="images/logo.svg"
                    alt="WCB Cafe 首頁"
                  />
                </a>
              </h1>
              <nav>
                <ul className="main-nav">
                  <li>
                    <a href="news.html">News</a>
                  </li>
                  <li>
                    <a href="menu.html">Menu</a>
                  </li>
                  <li>
                    <a href="contact.html">Contact</a>
                  </li>
                </ul>
              </nav>
            </header>
            <div className="menu-content wrapper">
              <h2 className="page-title">Menu</h2>
              <p>
                WCB
                CAFE提供有益健康的自然食物，主要的特色是菜單選用了無人工添加物的食材。
                請用好喝的綜合咖啡與健康的有機食物由體內開始療癒身心。
              </p>
            </div>
            {/* /.menu-content */}
          </div>
          {/* /#menu */}

          <div class="grid grid-cols-4 gap-4">
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>{' '}
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>{' '}
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>{' '}
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>{' '}
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>{' '}
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>
            <div>
              <img src="https://via.placeholder.com/330x440" alt="" />
              <p>照片說明照片說明照片說明照片說明</p>
            </div>
          </div>

          {/* /.grid */}
          <footer>
            <div className="wrapper">
              <p>
                <small>© 2019 Manabox</small>
              </p>
            </div>
          </footer>
        </>
      }
    </DefaultLayout>
  )
}
