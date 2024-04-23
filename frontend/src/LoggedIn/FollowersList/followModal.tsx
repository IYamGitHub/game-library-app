import { SetStateAction, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import Modal from '../../Components/Modal/modal';
import { Follower, FollowRow } from './followerPanel';
import * as client from '../../Users/client';
import './followerPanel.css';
import Avatar from '../../Components/Avatar/avatar';

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
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmit = async (searchString: string) => {
    if (searchString) {
      const results =
        username && (await client.searchUsername(username, searchString));
      if (results.length !== 0) {
        setNoResults(false);
        setResults(results);
      } else {
        setNoResults(true);
      }
    } else {
      setResults([]);
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
        <form onSubmit={() => onSubmit(searchString)}>
          <input
            className="form-control mb-2"
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
              onSubmit(e.target.value);
            }}
          />
        </form>
        {results.map((user) => (
          <div className="follow-row d-flex justify-content-between py-2">
            <div className="d-flex flex-row align-items-center gap-2">
              <Avatar imageUrl={user.avatar} size={55} />
              <p className="text-ellipsis">{user.username}</p>
            </div>
            <div className="d-flex gap-2">
              <button
                className="btn btn-light my-2"
                onClick={() => {
                  toggleModal();
                  navigate(`/gla/profile/${user.username}`);
                }}
              >
                View Profile
              </button>
              <button className="follow-btn my-2" onClick={() => follow(user)}>
                Follow
              </button>
            </div>
          </div>
        ))}
        {noResults && <p className="mt-3">No search results</p>}
      </div>
    </Modal>
  );
};

export default FollowModal;
