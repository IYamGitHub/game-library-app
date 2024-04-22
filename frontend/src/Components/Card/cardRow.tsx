import React from 'react';
import Card from './card';

const CardRow = () => {
  const games = [
    {
      name: 'League of Legends',
      image: 'league-of-legends.jpeg'
    },
    {
      name: 'Valorant',
      image: 'valorant.jpeg'
    }
  ];

  return (
    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-4">
      {games.map((game) => (
        <div className="col" key={game.name}>
          <Card image={game.image} text={game.name} />
        </div>
      ))}
    </div>
  );
};

export default CardRow;
