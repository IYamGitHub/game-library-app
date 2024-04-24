import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { User } from '../../Users/client';
import * as client from '../../Users/client';
interface CardProps {
  image?: string;
  text?: string;
  liked?: boolean;
}

const Card = ({ image, text }: CardProps) => {

  const [liked, setLiked] = useState<boolean>(false);

  useEffect(() => {
    async function updateLiked() {
      if (liked) {
        const user = await client.profile();
        await client.updateUser({ ...user, likes: [...user.likes, text] });
      }
    }
    updateLiked();
  }, [liked]);

  return (
    <Link className="gla-card" to="#">
      <img src={image} className="gla-card-image" alt="..." />
      <div className="gla-card-body">
        <p className="card-text m-0">{text}</p>
        {liked ? (
          <GoHeartFill className="like-icon" onClick={() => setLiked(!liked)} />
        ) : (
          <GoHeart className="like-icon" onClick={() => setLiked(!liked)} />
        )}
      </div>
    </Link>
  );
};

export default Card;
