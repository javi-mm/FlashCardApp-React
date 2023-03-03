import "./Login.scss";
import { auth, githubProvider, googleProvider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import { setDocCustom } from "../helpers/functions";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../UI/Button";

const Login = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const signIn = async (provider) => {
    try {
      const response = await signInWithPopup(auth, provider);
      const userParams = {
        uid: response.user.uid,
        name: response.user.displayName,
        photoURL: response.user.photoURL,
        email: response.user.email,
      };
      setDocCustom("users", userParams.uid, userParams);
      navigate(`/user/${userParams.uid}`);
    } catch (error) {
      console.log(error);
    }
  };

  const githubHandler = () => {
    signIn(githubProvider);
  };

  const googleHandler = () => {
    signIn(googleProvider);
  };

  return (
    <>
      <div className="login_wrapper">
        <h1>FlasCard App </h1>
        <Button
          onClick={googleHandler}
          size={"large"}
          fontSize={16}
          text={"Google"}
        ></Button>
        <Button
          size={"large"}
          fontSize={16}
          text={"GitHub"}
          onClick={githubHandler}
        ></Button>
      </div>
    </>
  );
};

export default Login;
