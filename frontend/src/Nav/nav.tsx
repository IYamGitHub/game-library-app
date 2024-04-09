import { Link, useLocation } from "react-router-dom";
import "./nav.css";
import { useEffect, useRef, useState } from "react";

type NavProps = {
  showNav: boolean;
};

const NavUserSection = () => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const ref = useRef<any>(null);

  //TODO: handle on click for sign out so that users cannot click back and be logged in

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target) && showOptions) {
        setShowOptions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div
      className="d-flex gap-3 align-items-center user-section"
      onClick={() => setShowOptions(!showOptions)}
      ref={ref}
    >
      <h4 className="m-0">IYamSushi</h4>
      <img
        src={`/avatars/blob1-red.png`}
        className="header-avatar"
        alt="Avatar"
      />
      {showOptions && (
        <div className="options">
          <Link to="/login" className="text-decoration-underline text-light">Sign out</Link>
        </div>
      )}
    </div>
  );
};

const Nav = ({ showNav = true }: NavProps) => {
  const { pathname } = useLocation();

  return (
    <div className="header-section d-flex justify-content-between px-4">
      <div className="d-flex gap-5">
        <h2 className="align-content-center">NAME</h2>
        {showNav && (
          <div className="d-flex gap-5 align-items-center">
            <Link
              to="/gla/profile/hi"
              className={`nav-link ${
                pathname.includes("profile") ? "active" : ""
              }`}
            >
              <h4>Profile</h4>
            </Link>
            <Link
              to="/gla/games/hi"
              className={`nav-link ${pathname.includes("a4") ? "active" : ""}`}
            >
              <h4>My Games</h4>
            </Link>
          </div>
        )}
      </div>
      {showNav && <NavUserSection />}
    </div>
  );
};

export default Nav;
