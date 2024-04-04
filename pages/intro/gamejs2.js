// 將此部分程式碼放入你的 HTML 文件中的 <script> 標籤中，以在客戶端環境中執行
document.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body');
  const tipDiv = document.querySelector('.game .tip');
  let canClick = true;
  let canSelect = false;
  let finished = false;
  let pickAry = [];

  body.addEventListener('click', async () => {
    if (canClick === false) {
      return false;
    }
    if (finished === true) {
      reset();
      return false;
    }
    tipDiv.innerHTML = 'Shuffling';

    let cardNum = getRandomNumbers(1, 44, 44);
    for (let i = 0; i < cardNum.length; i++) {
      document.querySelector(`.card${cardNum[i]} .back img`).innerHTML = '';

      let randomNumber = Math.floor(Math.random() * 44) + 1;
      document
        .querySelector(`.card${cardNum[i]} .back img`)
        .setAttribute(
          'src',
          `../images/FlowerInPot/image (${randomNumber}).png`
        );

      let ran = Math.round(Math.random() * 2);

      if (ran === 0) {
        document
          .querySelector(`.card${cardNum[i]} .back`)
          .classList.add('reversed');
      }
    }

    canClick = false;
    for (let i = 1; i <= 44; i++) {
      document.querySelector(`.card${i}`).classList.add(`card${i}Active`);
    }
    tipDiv.innerHTML = 'pick up the 1st card';
    canSelect = true;
  });

  // 監聽所有卡片的點擊事件
  for (let i = 1; i <= 44; i++) {
    document.querySelector(`.card${i}`).addEventListener('click', (e) => {
      if (canSelect) {
        canSelect = false;
        pickAry.push(i);
        playSelection();
      }
    });
  }

  // 重置遊戲
  async function reset() {
    tipDiv.innerHTML = '';
    canClick = false;
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
    tipDiv.innerHTML = 'click and start';
    canClick = true;
    canSelect = false;
    finished = false;
    pickAry = [];
  }

  // 播放選擇動畫
  async function playSelection() {
    let pickNum = pickAry.length - 1;
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
        tipDiv.innerHTML = 'pick up the 2nd card';
      } else if (pickAry.length === 2) {
        tipDiv.innerHTML = 'pick up the 3rd card';
      }
      canSelect = true;
    } else {
      tipDiv.innerHTML = 'click and restart';
      canClick = true;
      finished = true;
    }
  }

  // 延遲函數
  function waittings(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  // 獲取隨機數字陣列
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
});
