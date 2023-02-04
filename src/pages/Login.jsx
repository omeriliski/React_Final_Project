import { useRef, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { PostContext } from "../App";
import { ButtonPrimary, ButtonSecondary } from "../posts/Buttons";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const auth = getAuth();
  const navigate = useNavigate();

  const { setCurrentUser,getPostData,setPostData } = useContext(PostContext);

  const eventHandler = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user));
        setCurrentUser(res.user);

        getPostData();
        navigate("/");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="card-div">
      <h1>Anmelden</h1>
      <form onSubmit={eventHandler}>
        <div>
          <input type="email" ref={email} />
        </div>
        <div>
          <input type="password" ref={password} />
        </div>

        <ButtonPrimary text="Anmelden" />

        <NavLink to="/register">
          <ButtonSecondary text="Registrieren" />
        </NavLink>
      </form>
    </div>
  );
};

export default Login;
