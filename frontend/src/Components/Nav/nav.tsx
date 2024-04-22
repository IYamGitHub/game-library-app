import './nav.css';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ComponentClickOutside from '../ClickOutsideComponent/click-outside-component';
import NavMobile from './nav-mobile';
import Avatar from '../Avatar/avatar';
import * as client from '../../Users/client';

type NavTab = {
  text: string;
  link: string;
};

export const NAVTABS: NavTab[] = [
  { text: 'Profile', link: 'profile' },
  { text: 'My Games', link: 'games' }
];

export interface NavProps {
  showNav: boolean;
}

const NavUserSection = ({ username }: { username: string }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>('');
  const signout = async () => {
    await client.signout();
  };

  useEffect(() => {
    async function getProfile() {
      const profile = await client.findUserByUsername(username);
      setAvatar(profile.avatar);
    }
    getProfile();
  });

  return (
    <ComponentClickOutside conditional={showOptions} setState={setShowOptions}>
      <div
        className="d-flex gap-3 align-items-center user-section fs-3"
        onClick={() => setShowOptions(!showOptions)}
      >
        <h3 className="m-0 d-none d-md-block">{username}</h3>
        <Avatar imageUrl={avatar} />
        {showOptions && (
          <div className="options fs-6">
            <Link
              onClick={signout}
              to="/login"
              className="text-decoration-underline text-light"
            >
              Sign out
            </Link>
          </div>
        )}
      </div>
    </ComponentClickOutside>
  );
};

const Nav = ({ showNav = true }: NavProps) => {
  const [username, setUsername] = useState<string>('');
  const { pathname } = useLocation();

  useEffect(() => {
    async function getUsername() {
      const username = (await client.profile()).username;
      setUsername(username);
    }
    getUsername();
  }, []);

  return (
    <>
      <NavMobile showNav={showNav} pathname={pathname} />
      <div className="header-section d-none d-sm-flex justify-content-between">
        <div className="d-flex gap-5">
          <h2 className="align-content-center m-0">FLAMMIE</h2>
          {showNav && (
            <div className="d-flex gap-5 align-items-center fs-3">
              {NAVTABS.map((tab, idx) => (
                <Link
                  key={idx}
                  to={`/gla/${tab.link}/${username}`}
                  className={`nav-link ${
                    pathname.includes(tab.link) ? 'active' : ''
                  }`}
                >
                  {tab.text}
                </Link>
              ))}
            </div>
          )}
        </div>
        {showNav && username && <NavUserSection username={username} />}
      </div>
    </>
  );
};

export default Nav;
