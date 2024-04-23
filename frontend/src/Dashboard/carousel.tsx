import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './carousel.css';

import { Autoplay, Navigation } from 'swiper/modules';
import Card from '../Components/Card/card';

export default function Carousel() {
  const mostLiked = [
    { name: 'Valorant', image: 'valorant.jpeg' },
    { name: 'League of Legends', image: 'league-of-legends.jpeg' },
    { name: 'League of Legends', image: 'league-of-legends.jpeg' },
    { name: 'League of Legends', image: 'league-of-legends.jpeg' },
    { name: 'League of Legends', image: 'league-of-legends.jpeg' },
    { name: 'League of Legends', image: 'league-of-legends.jpeg' }
  ];
  
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={15}
        pagination={{
          type: 'progressbar'
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Navigation]}
        className="swiper"
      >
          {mostLiked.map((game) => (
            <SwiperSlide>
              <Card image={game.image} text={game.name} />
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
}
