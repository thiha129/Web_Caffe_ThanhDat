import React from 'react';
import '../App.css';
import { Button } from './Button';
import '../css/Videoslider.css';
import '../css/Slider.css';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';

function Videoslider({ slides }) {
  return (
    <div className='khungsl-container'>

      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>CÀ PHÊ THÀNH ĐẠT</h1>
      <p>Tây Nguyên có gì?</p>
      <div className='khungsl-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Bỏ qua
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Xem ngay <i className='far fa-play-circle' />
        </Button>
      </div>
    </div>
    
  );
}

export default Videoslider;
