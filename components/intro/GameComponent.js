import React, { useState, useEffect } from 'react';

function GameComponent() {
  const [canClick, setCanClick] = useState(true);
  const [canSelect, setCanSelect] = useState(false);
  const [finished, setFinished] = useState(false);
  const [pickAry, setPickAry] = useState([]);
  const tipDiv = useRef(null);

  useEffect(() => {
    if (!tipDiv.current) return;

    const body = document.querySelector('body');
    body.addEventListener('click', handleClick);

    return () => {
      body.removeEventListener('click', handleClick);
    };
  }, []);

  useEffect(() => {
    if (finished) {
      reset();
    }
  }, [finished]);

  useEffect(() => {
    // 監聽所有卡片的點擊事件
    const cardClickListeners = [];
    for (let i = 1; i <= 44; i++) {
      const card = document.querySelector(`.card${i}`);
      const listener = () => {
        if (canSelect) {
          setCanSelect(false);
          setPickAry([...pickAry, i]);
          playSelection();
        }
      };
      card.addEventListener('click', listener);
      cardClickListeners.push({ card, listener });
    }

    return () => {
      cardClickListeners.forEach(({ card, listener }) => {
        card.removeEventListener('click', listener);
      });
    };
  }, [canSelect, pickAry]);

  const handleClick = () => {
    if (!canClick) return;
    if (finished) return reset();
    
    tipDiv.current.innerHTML = 'Shuffling';

    const cardNum = getRandomNumbers(1, 44, 44);
    for (let i = 0; i < cardNum.length; i++) {
      document.querySelector(`.card${cardNum[i]} .back img`).innerHTML = '';

      const randomNumber = Math.floor(Math.random() * 44) + 1;
      document.querySelector(`.card${cardNum[i]} .back img`).setAttribute(
        'src',
        `../images/FlowerInPot/image (${randomNumber}).png`
      );

      const ran = Math.round(Math.random() * 2);
      if (ran === 0) {
        document
          .querySelector(`.card${cardNum[i]} .back`)
          .classList.add('reversed');
      }
    }

    setCanClick(false);
    for (let i = 1; i <= 44; i++) {
      document.querySelector(`.card${i}`).classList.add(`card${i}Active`);
    }
    tipDiv.current.innerHTML = 'pick up the 1st card';
    setCanSelect(true);
  };

  async function reset() {
    tipDiv.current.innerHTML = '';
    setCanClick(false);
    for (let i = pickAry.length - 1; i >= 0; i--) {
      document
        .querySelector(`.card${pickAry[i]} .content`)
        .classList.remove('active');
      await waittings(300);
      document
        .querySelector(`.card${pickAry[i]}`)
        .classList.remove(`forward${i + 1}2`);
      await waittings(300);
      document
        .querySelector(`.card${pickAry[i]}`)
        .classList.remove(`forward${i + 1}`);
      document
        .querySelector(`.card${pickAry[i]}`)
        .classList.add(`card${pickAry[i]}Active`);
      await waittings(300);
    }

    await waittings(500);
    for (let i = 1; i <= 44; i++) {
      document.querySelector(`.card${i}`).classList.remove(`card${i}Active`);
      document.querySelector(`.card${i} .back`).classList.remove('reversed');
    }
    await waittings(1000);
    tipDiv.current.innerHTML = 'click and start';
    setCanClick(true);
    setCanSelect(false);
    setFinished(false);
    setPickAry([]);
  }

  async function playSelection() {
    const pickNum = pickAry.length - 1;
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.remove(`card${pickAry[pickNum]}pickup`);
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.remove(`card${pickAry[pickNum]}Active`);
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.add(`forward${pickAry.length}`);
    await waittings(300);
    document
      .querySelector(`.card${pickAry[pickNum]}`)
      .classList.add(`forward${pickAry.length}2`);
    await waittings(300);
    document
      .querySelector(`.card${pickAry[pickNum]} .content`)
      .classList.add('active');
    await waittings(1000);
    if (pickAry.length < 3) {
      if (pickAry.length === 1) {
        tipDiv.current.innerHTML = 'pick up the 2nd card';
      } else if (pickAry.length === 2) {
        tipDiv.current.innerHTML = 'pick up the 3rd card';
      }
      setCanSelect(true);
    } else {
      tipDiv.current.innerHTML = 'click and restart';
      setCanClick(true);
      setFinished(true);
    }
  }

  function waittings(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  function getRandomNumbers(start, end, count) {
    const numbers = Array.from(
      { length: end - start + 1 },
      (v, i) => i + start
    );
    const result = [];
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      result.push(numbers[randomIndex]);
      numbers.splice(randomIndex, 1);
    }
    return result;
  }

  return <div className="game">
    <div className="tip" ref={tipDiv}></div>
    {/* 其他遊戲元素 */}
  </div>;
}

export default GameComponent;
