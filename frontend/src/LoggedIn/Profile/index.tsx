import React, { useEffect, useState } from 'react';
import './index.css';
import { BiSolidPencil } from 'react-icons/bi';
import Modal from '../../Components/Modal/modal';
import { useParams } from 'react-router';
import * as client from '../../Users/client';

export const AVATARS = require
  .context('/public/avatars', true)
  .keys()
  .map((path) => path.substring(2));

type AvatarModalProps = {
  submitAvatar: (avatar: string) => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

type ProfileProps = {
  onRefresh: () => void;
};

type Profile = {
  username: string;
  avatar: string;
  bio: string;
};

//TODO
//think about what else to add to this page bc it's a little lacking
//pick a better background color for the modal

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

const Profile = ({ onRefresh }: ProfileProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>('IYamSushi has not set a bio yet.');
  const [editBioText, setEditBioText] = useState<string>(bio);
  const { username } = useParams();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function getProfile() {
      if (username) {
        const profile = await client.findUserByUsername(username);
        setProfile(profile);
        setBio(profile.bio || 'IYamSushi has not set a bio yet.');
      }
    }
    getProfile();
  }, [username]);

  const saveBioEdit = async () => {
    setEditBio(false);
    setBio(editBioText);
    await client.updateUser({ ...profile, bio: editBioText });
  };

  const cancelBioEdit = () => {
    setEditBio(false);
    setEditBioText(bio);
  };

  const submitAvatar = async (newAvatar: string) => {
    await client.updateUser({ ...profile, avatar: newAvatar });
    const updatedProfile =
      username && (await client.findUserByUsername(username));
    setProfile({ ...updatedProfile, avatar: newAvatar });
    onRefresh();
  };

  return (
    <>
      <AvatarModal
        showModal={showModal}
        setShowModal={setShowModal}
        submitAvatar={submitAvatar}
      />
      <div>
        <div className="profile-header">
          <div className="avatar rounded-circle">
            <img
              src={`/avatars/${profile?.avatar}`}
              className="h-100 image"
              alt="Avatar"
            />
            <BiSolidPencil className="edit-icon" />
            <div className="edit-overlay" onClick={() => setShowModal(true)}>
              <h3>Edit</h3>
            </div>
          </div>
          <div className="text-center text-sm-start ms-sm-5">
            <h1>{username}</h1>
            <h6 className="text-decoration-underline">100 followers</h6>
          </div>
        </div>
        <div className="mt-5">
          <div className="d-flex w-100 justify-content-between">
            <h1>Bio</h1>
            {!editBio && (
              <BiSolidPencil
                className="edit-icon ms-3"
                onClick={() => setEditBio(true)}
              />
            )}
          </div>
          <hr className="mt-0" />
          {editBio ? (
            <div className="d-flex flex-column justify-content-end">
              <textarea
                className="form-control"
                rows={7}
                value={editBioText}
                onChange={(e) => setEditBioText(e.target.value)}
              ></textarea>
              <div className="ms-auto">
                <button
                  onClick={cancelBioEdit}
                  className="btn btn-secondary mt-3 ms-auto px-5"
                >
                  Cancel
                </button>
                <button
                  onClick={saveBioEdit}
                  className="btn btn-light mt-3 ms-2 px-5"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <p>{bio}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
