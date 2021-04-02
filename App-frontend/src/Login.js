import { Button } from "@material-ui/core";
import { auth, provider } from "./firebase";
import React from "react";
import "./Login.css";

const signIn = () => {
  auth.signInWithPopup(provider).catch((error) => alert(error.message));
};

function Login() {
  return (
    <div className="login">
      <div className="login__logo">
        <img
          src="https://user-images.githubusercontent.com/49202320/113196587-4e7a3380-9281-11eb-9fb2-9e50ec44415c.png"
          alt="App Logo"
        />
      </div>

      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
}

export default Login;
