import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { PostContext } from "../App";
import { getAuth, signOut } from "firebase/auth";
import "./Navbar.scss";
import "../App.scss";
import Plus from "../posts/img/plus.svg";
import Logo from "../posts/img/logo.svg";
import { LogRegisterButton } from "../posts/Buttons";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useContext(PostContext);

  const location = useLocation();

  const logout = () => {
    const auth = getAuth();
    signOut(auth);
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  return (
    <div className="header-wrapper">
      <div className="fixed-post-width">
      <NavLink to="/" className="logo">
        <img src={Logo} />
      </NavLink>

      {currentUser ? (
        <NavLink to="/create" className="plus-for-post">
          <img src={Plus} />{" "}
        </NavLink>
      ) : null}

      <div className="hamburger-menu"></div>

      {currentUser ? (
        <NavLink to="/login" onClick={logout}>
          <LogRegisterButton text="Logout" />
        </NavLink>
      ) : null}

        {/* question: do we need this two buttons? */}
      {!currentUser && location.pathname != "/login" ? (
        <NavLink to="/login" >
          <LogRegisterButton text="Anmelden"/>
        </NavLink>
      ) : null}
      {/* {!currentUser && location.pathname != "/register" ? (
        <NavLink to="/register">
          <LogRegisterButton text="Registrieren" />
        </NavLink>
      ) : null} */}
      </div>
    </div>
  );
};
export default Navbar;
