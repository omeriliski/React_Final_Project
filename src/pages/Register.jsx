import { useRef } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate, NavLink } from "react-router-dom";
import "./register.scss";
import { ButtonPrimary, ButtonSecondary } from "../posts/Buttons";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password1 = useRef();
  const password2 = useRef();
  const auth = getAuth();
  const navigate = useNavigate();

  const eventHandler = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password1.current.value
    )
      .then(() => {
        console.log("registered :>> ");
        //   router.push('/')
        navigate("/login");
      })
      .catch((e) => {
        alert(e.message);
      });
  };
  return (
    <div className="card-div">
      <h1>Register</h1>
      <form onSubmit={eventHandler}>
        <div>
          <input type="text" ref={username} placeholder="Username" />
        </div>
        <div>
          <input type="email" ref={email} placeholder="E-Mail" />
        </div>
        <div>
          <input type="password" ref={password1} placeholder="Password" />
        </div>
        <div>
          <input
            type="password"
            ref={password2}
            placeholder="Repeat the password"
          />
        </div>
        <div className="buttons">
        <ButtonPrimary text="Register" onClick/>
        <NavLink to="/login">
          <ButtonSecondary text="Anmelden" />
        </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Register;
