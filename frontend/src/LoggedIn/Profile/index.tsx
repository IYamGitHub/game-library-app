import React, { useEffect, useState } from 'react';
import './index.css';
import { BiSolidPencil } from 'react-icons/bi';
import { useNavigate, useParams } from 'react-router';
import * as client from '../../Users/client';
import * as gameClient from '../../Games/client';
import * as steamClient from '../../Games/steamClient';
import CardRow from '../../Components/Card/cardRow';
import GameIdForm from './gameIdForm';
import AvatarModal from './avatarModal';

type ProfileProps = {
  onRefresh: () => void;
};

type ProfileType = {
  username: string;
  avatar: string;
  bio: string;
  riotid: string;
  steamid: string;
  following: string[];
  role: string;
};

//TODO
//think about what else to add to this page bc it's a little lacking
//pick a better background color for the modal

const Profile = ({ onRefresh }: ProfileProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { username } = useParams();
  const [myProfile, setMyProfile] = useState<boolean>(true);
  const [editBio, setEditBio] = useState<boolean>(false);
  const [bio, setBio] = useState<string>('');
  const [editBioText, setEditBioText] = useState<string>(bio);
  const [steamId, setSteamId] = useState<string>();
  const [riotId, setRiotId] = useState<string>();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [currentUser, setCurrentUser] = useState<ProfileType | null>(null);
  const [followers, setFollowers] = useState<any[]>([]);
  const [adminUser, setAdminUser] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getProfile() {
      try {
        if (username) {
          const currentUser = await client.profile();
          const viewingProfile = await client.findUserByUsername(username);
          setProfile(viewingProfile);
          setBio(viewingProfile.bio);
          setSteamId(viewingProfile.steamid);
          setRiotId(viewingProfile.riotid);
          setCurrentUser(currentUser);
          setMyProfile(currentUser?.username === viewingProfile?.username);
          setAdminUser(currentUser.role === "ADMIN")

          const followers = await client.getFollowers(viewingProfile?.username);
          setFollowers(followers);
        }
      }
      catch(e) {
        console.log(e)
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

  const saveSteamId = async () => {
    await client.updateUser({ ...profile, steamid: steamId });
  };

  useEffect(() => {
    async function createAllGames() {
      if (steamId) {
        const games = await steamClient.getOwnedGames(steamId);
        // create games in the database
        for (let game of games) {
          const gameData = {
            origin: 'steam',
            gamename: game.name,
            imageurl: game.url_store_header
          };
          await gameClient.createGame(gameData);
        }
      }
    }
    createAllGames();
  }, [steamId]);

  const saveRiotId = async () => {
    await client.updateUser({ ...profile, riotid: riotId });
  };

  const submitAvatar = async (newAvatar: string) => {
    await client.updateUser({ ...profile, avatar: newAvatar });
    const updatedProfile =
      username && (await client.findUserByUsername(username));
    setProfile({ ...updatedProfile, avatar: newAvatar });
    onRefresh();
  };

  const follow = async () => {
    if (currentUser && profile) {
      await client.follow(currentUser.username, profile.username).then(() => {
        setCurrentUser({
          ...currentUser,
          following: [...currentUser?.following, profile.username]
        });
        onRefresh();
      });
    }
  };

  const unfollow = async () => {
    if (currentUser && profile) {
      await client.unfollow(currentUser.username, profile.username).then(() => {
        setCurrentUser({
          ...currentUser,
          following: currentUser.following.filter(
            (follow) => follow !== profile.username
          )
        });
        onRefresh();
      });
    }
  };

  const deleteUser = async (user : any) => {
    try {
      const viewingProfile = await client.findUserByUsername(profile?.username || '');
      await client.deleteUser(viewingProfile);
      if (currentUser) {
        alert(profile?.username + " has been deleted :(")
        navigate(`/gla/profile/${currentUser.username}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AvatarModal
        showModal={showModal}
        setShowModal={setShowModal}
        submitAvatar={submitAvatar}
      />
      <div style={{ marginBottom: '40px' }}>
        <div className="profile-header d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <div
              className={`avatar rounded-circle d-flex flex-column ${myProfile && 'my-profile'}`}
            >
              <img
                src={`/avatars/${profile?.avatar}`}
                className="h-100 image"
                alt="Avatar"
              />
              {myProfile && (
                <>
                  <BiSolidPencil className="edit-icon" />
                  <div
                    className="edit-overlay"
                    onClick={() => setShowModal(true)}
                  >
                    <h3>Edit</h3>
                  </div>
                </>
              )}
            </div>
            <div className="text-center text-sm-start ms-sm-5 d-flex flex-column">
              <div className="d-flex flex-column">
                <h1>{username}</h1>
                <h6>{followers.length} followers</h6>
              </div>
            </div>
          </div>
          {myProfile ? (
            <GameIdForm
              steamId={steamId || ''}
              riotId={riotId || ''}
              setRiotId={setRiotId}
              setSteamId={setSteamId}
              saveSteamId={saveSteamId}
              saveRiotId={saveRiotId}
            />
          ) : currentUser?.following.find(
            (following) => following === profile?.username
          ) ? (
            <div>
              <button className="btn btn-light px-4" onClick={unfollow}>
                Unfollow
              </button>
              {adminUser && 
              (<button className="btn btn-danger px-4" onClick={deleteUser}>
                Delete
              </button>)}
            </div>
          ) : (
            <div>
              <button className="btn btn-light px-4" onClick={follow}>
                Follow
              </button>
              {adminUser && 
              (<button className="btn btn-danger px-4 me-2" onClick={deleteUser}>
                Delete
              </button>)}
            </div>
          )
          }
        </div>
        <div className="mt-5">
          <div className="d-flex w-100 justify-content-between">
            <h1>Bio</h1>
            {!editBio && myProfile && (
              <BiSolidPencil
                className="edit-icon ms-3"
                onClick={() => setEditBio(true)}
              />
            )}
          </div>
          <hr className="mt-0" />
          {editBio && myProfile ? (
            <div className="d-flex flex-column justify-content-end">
              <textarea
                className="form-control"
                rows={7}
                value={editBioText}
                onChange={(e) => setEditBioText(e.target.value)}
                style={{ backgroundColor: 'transparent', color: 'inherit' }}
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
      <CardRow />
    </>
  );
};

export default Profile;
