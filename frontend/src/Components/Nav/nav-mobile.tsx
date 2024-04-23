import React, { useState } from 'react';
import { CgMenu } from 'react-icons/cg';
import { VscChromeClose } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import ComponentClickOutside from '../ClickOutsideComponent/click-outside-component';
import { NAVTABS, NavProps } from './nav';
import { IoExitOutline } from 'react-icons/io5';
import Avatar from '../Avatar/avatar';
import * as client from '../../Users/client';
import { ProfileType } from '../../LoggedIn/Profile';
import { FollowContent } from '../../LoggedIn/FollowersList/followerPanel';
interface NavMobileSubpartsProps extends NavProps {
  openNav: boolean;
  setOpenNav: (openNav: boolean) => void;
  user?: ProfileType;
  openFollowing: boolean;
  setOpenFollowing: (openFollowing: boolean) => void;
}

const NavMobileBar = ({
  showNav,
  openNav,
  setOpenNav,
  openFollowing,
  setOpenFollowing,
  user
}: NavMobileSubpartsProps) => {
  return (
    <div
      className={`header-section d-sm-none px-4 nav-mobile ${openNav || openFollowing ? 'hide' : ''}`}
    >
      <div className="d-flex gap-5 flex-grow-1">
        {showNav && (
          <CgMenu className="fs-1" onClick={() => setOpenNav(!openNav)} />
        )}
        <h2 className="align-content-center m-0">FLAMMMIE</h2>
      </div>
      {showNav && user && (
        <div onClick={() => setOpenFollowing(true)}>
          <Avatar imageUrl={user.avatar} />
        </div>
      )}
    </div>
  );
};

const FollowingSlideout = ({
  openFollowing,
  setOpenFollowing
}: {
  openFollowing: boolean;
  setOpenFollowing: (openFollowing: boolean) => void;
}) => {
  return (
    <ComponentClickOutside
      conditional={openFollowing}
      setState={setOpenFollowing}
    >
      <div
        className={`slideout d-sm-none follow-slideout ${openFollowing ? 'show' : ''}`}
      >
        <div className="d-flex gap-5 justify-content-between">
          <h2 className="align-content-center m-0">FLAMMIE</h2>
          {openFollowing && (
            <VscChromeClose
              className="fs-1"
              onClick={() => setOpenFollowing(!openFollowing)}
            />
          )}
        </div>
        <FollowContent refresh={true} />
      </div>
    </ComponentClickOutside>
  );
};

const NavMobileSlideout = ({
  showNav,
  openNav,
  setOpenNav,
  user
}: Omit<NavMobileSubpartsProps, 'openFollowing' | 'setOpenFollowing'>) => {
  const { pathname } = useLocation();
  const signout = async () => {
    await client.signout();
  };

  return (
    <ComponentClickOutside conditional={openNav} setState={setOpenNav}>
      <div className={`slideout nav-slideout ${openNav ? 'show' : ''}`}>
        <div>
          <div className="d-flex gap-5 justify-content-between">
            <h2 className="align-content-center m-0">FLAMMIE</h2>
            {showNav && (
              <VscChromeClose
                className="fs-1"
                onClick={() => setOpenNav(!openNav)}
              />
            )}
          </div>
          <div className="d-flex flex-column fs-5 mt-5">
            {NAVTABS.map((tab, idx) => (
              <Link
                key={idx}
                to={`/gla/${tab.link}/${user?.username}`}
                className={`nav-link ${
                  pathname.includes(tab.link) ? 'active' : ''
                }`}
              >
                {tab.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="fs-6 mb-4">
          <Link
            onClick={signout}
            to="/login"
            className="text-decoration-underline text-light"
          >
            Sign out
            <IoExitOutline className="ms-2 fs-5" />
          </Link>
        </div>
      </div>
    </ComponentClickOutside>
  );
};

const NavMobile = ({ showNav = true, user }: NavProps & { user?: any }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const [openFollowing, setOpenFollowing] = useState<boolean>(false);

  return (
    <>
      <NavMobileSlideout
        showNav={showNav}
        openNav={openNav}
        setOpenNav={setOpenNav}
        user={user}
      />
      <FollowingSlideout
        openFollowing={openFollowing}
        setOpenFollowing={setOpenFollowing}
      />
      <NavMobileBar
        showNav={showNav}
        openNav={openNav}
        setOpenNav={setOpenNav}
        user={user}
        openFollowing={openFollowing}
        setOpenFollowing={setOpenFollowing}
      />
    </>
  );
};

export default NavMobile;
