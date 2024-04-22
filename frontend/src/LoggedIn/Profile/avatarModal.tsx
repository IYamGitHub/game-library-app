import React, { useState } from 'react';
import Modal from '../../Components/Modal/modal';

export const AVATARS = require
  .context('/public/avatars', true)
  .keys()
  .map((path) => path.substring(2));

type AvatarModalProps = {
  submitAvatar: (avatar: string) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const AvatarModal = ({
  submitAvatar,
  showModal,
  setShowModal
}: AvatarModalProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>('');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit = async () => {
    if (selectedAvatar) {
      setShowModal(false);
      submitAvatar(selectedAvatar);
    }
  };

  return (
    <Modal
      title="Choose your new avatar!"
      open={showModal}
      onClose={toggleModal}
      footer={
        <button
          className="btn btn-light mt-4 select-button px-5 mx-auto"
          onClick={() => onSubmit()}
        >
          Select
        </button>
      }
    >
      <div className="d-flex flex-column">
        <div className="flex-row d-flex flex-wrap">
          {AVATARS.map((avatar) => {
            return (
              <img
                key={avatar}
                src={`/avatars/${avatar}`}
                className={`avatar ${
                  avatar === selectedAvatar ? 'selected' : ''
                }`}
                alt="Avatar"
                onClick={() => setSelectedAvatar(avatar)}
              />
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default AvatarModal;
