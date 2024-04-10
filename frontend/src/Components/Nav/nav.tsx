import { Link, useLocation } from 'react-router-dom';
import './nav.css';
import { useState } from 'react';

import ComponentClickOutside from '../ClickOutsideComponent/click-outside-component';
import NavMobile from './nav-mobile';

export interface NavProps {
  showNav: boolean;
}

const NavUserSection = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  return (
    <ComponentClickOutside conditional={showOptions} setState={setShowOptions}>
      <div
        className="d-flex gap-3 align-items-center user-section fs-3"
        onClick={() => setShowOptions(!showOptions)}
      >
        <h3 className="m-0 d-none d-md-block">IYamSushi</h3>
        <img
          src={`/avatars/blob1-red.png`}
          className="header-avatar"
          alt="Avatar"
        />
        {showOptions && (
          <div className="options fs-6">
            <Link to="/login" className="text-decoration-underline text-light">
              Sign out
            </Link>
          </div>
        )}
      </div>
    </ComponentClickOutside>
  );
};

const Nav = ({ showNav = true }: NavProps) => {
  const { pathname } = useLocation();

  //TODO: handle on click for sign out so that users cannot click back and be logged in

  return (
    <>
      <NavMobile showNav={showNav} pathname={pathname} />
      <div className="header-section d-none d-sm-flex justify-content-between px-4">
        <div className="d-flex gap-5">
          <h2 className="align-content-center m-0">NAME</h2>
          {showNav && (
            <div className="d-flex gap-5 align-items-center">
              <Link
                to="/gla/profile/hi"
                className={`fs-3 gla-nav-link ${
                  pathname.includes('profile') ? 'active' : ''
                }`}
              >
                Profile
              </Link>
              <Link
                to="/gla/games/hi"
                className={`fs-3 gla-nav-link ${
                  pathname.includes('games') ? 'active' : ''
                }`}
              >
                My Games
              </Link>
            </div>
          )}
        </div>
        {showNav && <NavUserSection />}
      </div>
    </>
  );
};

export default Nav;
