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
      if (liked) {
        const user = await client.profile();
        await client.updateUser({ ...user, likes: [...user.likes, text] });
      }
    }
    updateLiked();
  }, [liked]);

  return (
    <div>
      <Link className="gla-card" to="#" onClick={openModal}>
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
      {Component && (
        <Modal title={text ?? ''} open={modalIsOpen} onClose={closeModal}>
          <Component />
        </Modal>
      )}
    </div>
  );
};

export default Card;