import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './card.css';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import Modal from '../Modal/modal';
import * as client from '../../Users/client';

interface CardProps {
  image?: string;
  text?: string;
  liked?: boolean;
  Component?: React.ComponentType;
}

const Card = ({ image, text, Component }: CardProps) => {
  const [liked, setLiked] = useState<boolean>(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    async function updateLiked() {
      try {
        const user = await client.profile();
        if (user.likes.includes(text)) {
          setLiked(true);
        }
      }
      catch(e) {
        console.log(e)
      }
    }
    updateLiked();
  }, []);

  const updateLikedGames = async () => {
    try {
      const user = await client.profile();
      
      if (!user.likes.includes(text)) {
        await client.updateUser({ ...user, likes: [...user.likes, text] });
        setLiked(true)
      }
      else if (user.likes.includes(text)) {
        const removeLastLiked = user.likes.slice(0, -1);
        await client.updateUser({ ...user, likes: removeLastLiked });
        setLiked(false)
      }
    }
    catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <Link className="gla-card" to="#" onClick={openModal}>
        <img src={image} className="gla-card-image" alt="..." />
        <div className="gla-card-body">
          <p className="card-text m-0">{text}</p>
          {liked ? (
            <GoHeartFill className="like-icon" onClick={updateLikedGames} />
          ) : (
            <GoHeart className="like-icon" onClick={updateLikedGames} />
          )}
        </div>
      </Link>
      {Component && (
        <Modal title={text ?? ''} open={modalIsOpen} onClose={closeModal}>
          <Component />
        </Modal>
      )}
    </div>
  );
};

export default Card;