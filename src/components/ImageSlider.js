import React, { useState, useEffect, useCallback } from 'react';
// images
import Slide_image1 from '../images/더누리 (1).png';
import Slide_image2 from '../images/더누리(2).png';
import Slide_image3 from '../images/더누리(3).gif';

const ImageSlider = () => {
  const slideImages = [
    {
      id: 0,
      img: Slide_image1
    },
    {
      id: 1,
      img: Slide_image2//
    },
    {
      id: 2,
      img: Slide_image3
    },
  ];

  // const slideButtons = [0, 1, 2];

  const [currentIdx, setCurrentIdx] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIdx((preIdx) => (preIdx + 1) % slideImages.length);
  }, [slideImages.length]);

  // const changeCurSlide = (clickIndex) => {
  //   setCurrentIdx((preIdx) => (clickIndex));
  // }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentIdx, nextSlide]);



  return (
    <div className="imageSlider-wrapper">
      {slideImages.map((image) => (
        <img
          key={image.id}
          className={`slide-image ${image.id === currentIdx ? "active" : ""}`}
          src={image.img}
          alt={`slide ${image.id}`}
        />
      ))}
    </div>
  )
}

export default ImageSlider