import React, { useState } from 'react';
import Card from './card';
import League from '../../Games/league';

interface Game {
  name: string;
  image: string;
  component: React.ComponentType | undefined;
}

const CardRow = () => {
  const games: Game[] = [
    {
      name: 'League of Legends',
      image: 'league-of-legends.jpeg',
      component: League
    },
    {
      name: 'Valorant',
      image: 'valorant.jpeg',
      component: undefined
    }
  ];

  return (
    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-4">
      {games.map((game) => (
        <div className="col" key={game.name}> 
            <Card image={game.image} text={game.name} Component={game.component} />
        </div>
      ))}
    </div>
  );
};

export default CardRow;
