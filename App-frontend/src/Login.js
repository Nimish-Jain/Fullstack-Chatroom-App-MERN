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
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Discordikona_lv.png/320px-Discordikona_lv.png"
          // src="./features/logo.png"
          alt="App Logo"
        />
      </div>

      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
}

export default Login;
