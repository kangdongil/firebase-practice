import AuthForm from "components/AuthForm";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { authService } from "firebaseConfig";
import React from "react";

export default ({ refreshUser }) => {
  const onSocialClick = async (event) => {
    const { name } = event.target;
    let provider;
    switch (name) {
      case "google":
        provider = new GoogleAuthProvider();
        break;
      case "github":
        provider = new GithubAuthProvider();
        break;
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <div>
      <AuthForm refreshUser={refreshUser} />
      <div>
        <button name="google" onClick={onSocialClick}>
          Continue with Google
        </button>
        <button name="github" onClick={onSocialClick}>
          Continue with Github
        </button>
      </div>
    </div>
  );
};
