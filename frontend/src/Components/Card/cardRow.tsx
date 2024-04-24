import React, { useEffect, useState } from 'react';
import Card from './card';
import League from '../../Games/league';
import Steam from '../../Games/steam';
import * as client from '../../Games/client';

interface Game {
  origin: string
  gamename: string;
  imageurl: string;
  component: React.ComponentType;
}

const CardRow = () => {
  const [games, setGames] = useState<Game[]>();

  useEffect(() => {
    async function fetchGames() {
      const response = await client.findAllGames();

      for (const res of response) { 
        if (res.origin === 'league') {
          res.component = League;
        } else if (res.origin === 'steam') {
          res.component = () => <Steam passedInGame={res.gamename}/>;
        } else {
          res.component = undefined;
        } 
      }

      setGames(response);
    }
    fetchGames();
  }, []);

  return (
    <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-4 g-4">
      {games?.map((game) => (
        <div className="col" key={game.gamename}>
          <Card image={game.imageurl} text={game.gamename} Component={game.component} />
        </div>
      ))}
    </div>
  );
};

export default CardRow;
