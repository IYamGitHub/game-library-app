import React, { SetStateAction, useEffect, useState } from 'react';
import Avatar from '../../Components/Avatar/avatar';
import './followerPanel.css';
import * as client from '../../Users/client';
import { IoPersonAdd } from 'react-icons/io5';
import Modal from '../../Components/Modal/modal';
import { useLocation } from 'react-router';

interface Follower {
  username: string;
  avatar: string;
}

const FollowRow = ({ username, avatar }: Follower) => {
  return (
    <div className="d-flex flex-row align-items-center gap-2">
      <Avatar imageUrl={avatar} size={55} />
      <p className="test">{username}</p>
    </div>
  );
};

type FollowModalProps = {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  setFollowing: (follwing: SetStateAction<any[]>) => void;
};

const FollowModal = ({
  showModal,
  setShowModal,
  setFollowing
}: FollowModalProps) => {
  const { pathname } = useLocation();
  const username = pathname.split('/').pop();
  const [searchString, setSearchString] = useState<string>('');
  const [results, setResults] = useState<Follower[]>([]);
  const [noResults, setNoResults] = useState<boolean>(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit = async () => {
    const results =
      username && (await client.searchUsername(username, searchString));
    if (results.length !== 0) {
      setNoResults(false);
      setResults(results);
    } else {
      setNoResults(true);
    }
  };

  const follow = async (user: Follower) => {
    if (username) {
      await client.follow(username, user.username);
      setFollowing((prev: Follower[]) => [...prev, user]);
    }
  };

  return (
    <Modal title="Search users" open={showModal} onClose={toggleModal}>
      <div className="d-flex flex-column w-100 searchModal">
        <form onSubmit={onSubmit}>
          <input
            className="form-control"
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
          />
        </form>
        {results.map((user) => (
          <div className="d-flex justify-content-between py-2">
            <FollowRow username={user.username} avatar={user.avatar} />
            <button className="btn btn-light my-2" onClick={() => follow(user)}>
              Follow
            </button>
          </div>
        ))}
        {noResults && <p className="mt-3">No search results</p>}
      </div>
    </Modal>
  );
};

const FollowPanel = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [following, setFollowing] = useState<any[]>([]);

  useEffect(() => {
    async function getFollowing() {
      const following = await client.findFollowers('hi');
      setFollowing(following);
    }
    getFollowing();
  }, []);

  return (
    <>
      <FollowModal
        showModal={showModal}
        setShowModal={setShowModal}
        setFollowing={setFollowing}
      />
      <div className="panel d-none d-sm-flex">
        <div className="overflow-hidden flex-grow-1">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="m-0">Following</h2>
            <IoPersonAdd
              className="fs-3 add-icon"
              onClick={() => setShowModal(true)}
            />
          </div>
          <div className="h-100 overflow-scroll">
            {following.map((following, idx) => (
              <FollowRow
                key={idx}
                username={following.username}
                avatar={following.avatar}
              />
            ))}
          </div>

          <h2 className="mt-2">Followers</h2>
        </div>
      </div>
    </>
  );
};

export default FollowPanel;
