import { useState } from 'react';
import { CgMenu } from 'react-icons/cg';
import { VscChromeClose } from 'react-icons/vsc';
import { Link, useLocation } from 'react-router-dom';
import ComponentClickOutside from '../ClickOutsideComponent/click-outside-component';
import { NAVTABS, NavProps } from './nav';
import { IoExitOutline } from 'react-icons/io5';

interface NavMobileSubpartsProps extends NavProps {
  openNav: boolean;
  setOpenNav: (openNav: boolean) => void;
}

const NavMobileBar = ({
  showNav,
  openNav,
  setOpenNav
}: NavMobileSubpartsProps) => {
  return (
    <div
      className={`header-section d-sm-none px-4 nav-mobile ${openNav ? 'hide' : ''}`}
    >
      <div className="d-flex gap-5 flex-grow-1">
        {showNav && (
          <CgMenu className="fs-1" onClick={() => setOpenNav(!openNav)} />
        )}
        <h2 className="align-content-center m-0">NAME</h2>
      </div>
      {showNav && (
        <img
          src={`/avatars/blob1-red.png`}
          className="header-avatar"
          alt="Avatar"
        />
      )}
    </div>
  );
};

const NavMobileSlideout = ({
  showNav,
  openNav,
  setOpenNav
}: NavMobileSubpartsProps) => {
  const { pathname } = useLocation();

  return (
    <div className={`nav-slideout ${openNav ? 'show' : ''}`}>
      <div>
        <ComponentClickOutside conditional={openNav} setState={setOpenNav}>
          <div className="d-flex gap-5 justify-content-between">
            <h2 className="align-content-center m-0">NAME</h2>
            {showNav && (
              <VscChromeClose
                className="fs-1"
                onClick={() => setOpenNav(!openNav)}
              />
            )}
          </div>
        </ComponentClickOutside>
        <div className="d-flex flex-column fs-5 mt-5">
          {NAVTABS.map((tab) => (
            <Link
              to={`/gla/${tab.link}${tab.linkParams}`}
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
        <Link to="/login" className="text-decoration-underline text-light">
          Sign out
          <IoExitOutline className="ms-2 fs-5" />
        </Link>
      </div>
    </div>
  );
};

const NavMobile = ({ showNav = true }: NavProps & { pathname: string }) => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  return (
    <>
      <NavMobileSlideout
        showNav={showNav}
        openNav={openNav}
        setOpenNav={setOpenNav}
      />
      <NavMobileBar
        showNav={showNav}
        openNav={openNav}
        setOpenNav={setOpenNav}
      />
    </>
  );
};

export default NavMobile;
