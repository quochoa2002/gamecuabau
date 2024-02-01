import './App.css';
import React, { useState } from 'react';
import { listImgs_1, listImgs_2, listImgs_3 } from './component/const/img';
import img1 from './component/img/bau.png';
import img2 from './component/img/ca.png';
import img3 from './component/img/tom.png';
import img4 from './component/img/mam.png';
import img5 from './component/img/nap.png';
import { notification } from 'antd';

function App() {
  const [randomImage, setRandomImage] = useState(img1);
  const [img, setImg] = useState(img2);
  const [random, setRandom] = useState(img3);
  const [isOpen, setIsOpen] = useState(false);
  const [shake, setShake] = useState(false);
  const [leftPosition, setLeftPosition] = useState(-600);
  const [isBouncing, setIsBouncing] = useState(false);

  console.log('shake', shake)

  console.log('isOpen', isOpen)

  const handleRandomizeImage = () => {
    const randomIndex1 = Math.floor(Math.random() * listImgs_1.length);
    const randomIndex2 = Math.floor(Math.random() * listImgs_2.length);
    const randomIndex3 = Math.floor(Math.random() * listImgs_3.length);
    const selectedImage1 = listImgs_1[randomIndex1];
    const selectedImage2 = listImgs_1[randomIndex2];
    const selectedImage3 = listImgs_1[randomIndex3];
    setRandomImage(selectedImage1);
    setRandom(selectedImage2)
    setImg(selectedImage3)

    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 500);
  };

  const openNotification = () => {
    notification.open({
      placement: 'top',
      closeIcon: false,
      description:
        'ĐẬY NẮP LẠI RỒI XÓC',
    });
  };

  const makeEaseOut = (timing) => (timeFraction) =>
    1 - timing(1 - timeFraction);

  const bounce = (timeFraction) => {
    for (let a = 0, b = 1; ; a += b, b /= 2) {
      if (timeFraction >= (7 - 4 * a) / 11) {
        return (
          -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        );
      }
    }
  };

  const bounceEaseOut = makeEaseOut(bounce);

  const animate = ({ duration, timing, draw }) => {
    const start = performance.now();

    setIsBouncing(true);

    const animateStep = (time) => {
      let progress = (time - start) / duration;

      if (progress > 1) {
        progress = 1;
        setIsBouncing(false);
      }

      const easedProgress = timing(progress);
      draw(easedProgress);

      if (progress < 1 && isBouncing) {
        requestAnimationFrame(animateStep);
      }
    };

    requestAnimationFrame(animateStep);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setLeftPosition(-600);
  }

  const handleClose = () => {
    setIsOpen(false);
    animate({
      duration: 3000,
      timing: bounceEaseOut,
      draw: (progress) => {
        setLeftPosition(progress * 500);
      },
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className='container'>
          <div className='container_child'>
            <img className='style-mam' src={img4} alt='img' />
            {/* {isOpen && ( */}
            <img style={{
              left: `${leftPosition}px`,
              position: "relative",
            }} className={`style-nap ${shake ? 'shake' : ''}`} src={img5} alt='img' />
            {/* )} */}
            <div className='container_img'>
              <img className='style-img' src={randomImage} alt='img' />
              <img className='style-img' src={img} alt='img' />
              <img className='style-img' src={random} alt='img' />
            </div>
          </div>
          <div className='flex-button'>
            <button className='button' onClick={handleOpen}>ĐẬY NẮP</button>
            <button className='button' onClick={isOpen === true ? handleRandomizeImage : openNotification}>XỐC</button>
            <button className='button' onClick={handleClose}>MỞ NẮP</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
