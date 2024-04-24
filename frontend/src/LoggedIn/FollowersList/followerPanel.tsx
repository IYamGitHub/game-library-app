import React, { useEffect, useState } from 'react';
import Avatar from '../../Components/Avatar/avatar';
import './followerPanel.css';
import * as client from '../../Users/client';
import { IoPersonAdd } from 'react-icons/io5';
import FollowModal from './followModal';
import { Link } from 'react-router-dom';
export interface Follower {
  username: string;
  avatar: string;
  inModal?: boolean;
}

export const FollowRow = ({ username, avatar, inModal = false }: Follower) => {
  return (
    <Link
      to={`/gla/profile/${username}`}
      className={`${!inModal && 'follow-row'} d-flex flex-row align-items-center gap-2`}
    >
      <Avatar imageUrl={avatar} size={55} />
      <p className="text-ellipsis">{username}</p>
    </Link>
  );
};

const FollowPanel = ({ refresh }: { refresh: boolean }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [following, setFollowing] = useState<any[]>([]);

  useEffect(() => {
    async function getFollowing() {
      const profile = await client.profile();
      const following = await client.findFollowers(profile.username);
      setFollowing(following);
    }
    getFollowing();
  }, [refresh]);

  return (
    <>
      <FollowModal
        showModal={showModal}
        setShowModal={setShowModal}
        setFollowing={setFollowing}
      />
      <div className="panel d-none d-sm-flex">
        <div className="overflow-hidden flex-grow-1">
          <div className="following-title align-items-center">
            <h2 className="m-0">Following</h2>
            <IoPersonAdd
              className="fs-3 add-icon"
              onClick={() => setShowModal(true)}
            />
          </div>
          <div className="d-flex flex-column gap-1 h-100 overflow-scroll scrollable-content">
            {following.map((following, idx) => (
              <FollowRow
                key={idx}
                username={following.username}
                avatar={following.avatar}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FollowPanel;
