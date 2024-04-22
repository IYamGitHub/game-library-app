import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';

interface CardProps {
  image?: string;
  text?: string;
  liked?: boolean;
}

const Card = ({ image, text }: CardProps) => {
  const [liked, setLiked] = useState<boolean>(false);
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
