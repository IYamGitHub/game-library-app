import React, { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './carousel.css';

import { Autoplay, Navigation } from 'swiper/modules';
import Card from '../Components/Card/card';
import * as client from '../Users/client';
import * as gameClient from '../Games/client';


export default function Carousel() {
  const [mostLiked, setMostLiked] = useState<Array<{ name: string; image: string }>>([]);

  const recommendations = [
    { name: 'League of Legends',  image: 'league-of-legends.jpeg' },
    { name: 'Valorant',           image: 'valorant.jpeg' },
    { name: 'Palworld',           image: 'https://steamcdn-a.akamaihd.net/steam/apps/1623730/header.jpg' },
    { name: 'Terraria',           image: 'https://steamcdn-a.akamaihd.net/steam/apps/105600/header.jpg' },
    { name: 'Among Us',           image: '	https://steamcdn-a.akamaihd.net/steam/apps/945360/header.jpg' },
  ];

  useEffect(() => {
    async function getGameImage(gameName: any) {
      const allGames = await gameClient.findAllGames();
      const game = allGames.find((game: any) => game.gamename === gameName);
      if (game) {
        return game.imageurl;    
      }
    }

    async function updateMostLiked() {
      const user = await client.profile();
      if (user) {
        const gamePromises = user.likes.map(async (gameName: string) => {
          const imageUrl = await getGameImage(gameName);
          return { name: gameName, image: imageUrl };
        });
        const updatedMostLiked = await Promise.all(gamePromises);
        setMostLiked(updatedMostLiked);
      }
      else {
        setMostLiked(recommendations);
      }
    }
    updateMostLiked();
  }, []);
  
  
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
