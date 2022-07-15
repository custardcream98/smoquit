import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { fireAuth } from "firebaseSetup";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let createdUser;
      if (newAccount) {
        createdUser = await createUserWithEmailAndPassword(
          fireAuth,
          email,
          password
        );
      } else {
        createdUser = await signInWithEmailAndPassword(
          fireAuth,
          email,
          password
        );
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((current) => !current);

  const onGoogleSignInClick = async (event) => {
    let provider;
    if (event.target.name === "google") {
      provider = new GoogleAuthProvider();
    }

    await signInWithPopup(fireAuth, provider);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "계정 생성하기" : "로그인"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "로그인" : "계정 생성하기"}
      </span>
      <div>
        <button name="google" onClick={onGoogleSignInClick}>
          Google 로그인
        </button>
      </div>
    </div>
  );
};

export default Auth;
