import React, { useState } from "react";
import "./index.css";
import { BiSolidPencil } from "react-icons/bi";
import Modal from "../../Modal/modal";

const AVATARS = require
  .context("/public/avatars", true)
  .keys()
  .map((path) => path.substring(2));

type AvatarModalProps = {
  onSubmit?: () => void;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

//TODO
//implement pulling a profile, put in set state so that updating the avatar will trigger rerender
//handle submit
//think about what else to add to this page bc it's a little lacking
//pick a better background color for the modal

const AvatarModal = ({
  onSubmit,
  showModal,
  setShowModal,
}: AvatarModalProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string>("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const submitAvatar = () => {
    if (selectedAvatar) {
      setShowModal(false);
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
          onClick={() => submitAvatar()}
        >
          Select
        </button>
      }
    >
      <div className="d-flex flex-column">
        <div>
          {AVATARS.map((avatar) => {
            return (
              <img
                key={avatar}
                src={`/avatars/${avatar}`}
                className={`avatar ${
                  avatar === selectedAvatar ? "selected" : ""
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

const Profile = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editBio, setEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>("IYamSushi has not set a bio yet.");

  const saveBioHandle = () => {
    setEditBio(false);
    // TODO: handle sending new bio to database
  };

  return (
    <>
      <AvatarModal showModal={showModal} setShowModal={setShowModal} />
      <div>
        <div
          id="profile-header"
          className="d-flex align-items-center profile-header"
        >
          <div className="avatar rounded-circle">
            <img
              src={`/avatars/${AVATARS[0]}`}
              className="h-100 image"
              alt="Avatar"
            />
            <BiSolidPencil className="edit-icon" />
            <div className="edit-overlay" onClick={() => setShowModal(true)}>
              <h3>Edit</h3>
            </div>
          </div>
          <div className="ms-5">
            <h1>IYamSushi</h1>
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
              <button onClick={saveBioHandle} className="btn btn-light mt-3 ms-auto px-5">
                Save
              </button>
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
