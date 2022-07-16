import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { fireAuth, fireStore } from "firebaseSetup";
import { DOC_PROFILE } from "firebaseSetup/docNames";

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
      if (newAccount) {
        let createdUser = await createUserWithEmailAndPassword(
          fireAuth,
          email,
          password
        );
        createdUser = await updateProfile(createdUser.user, {
          displayName: createdUser.user.email.split("@")[0],
        });
        await setDoc(doc(fireStore, DOC_PROFILE, createdUser.user.uid), {
          cigPerDay: 20,
        });
      } else {
        await signInWithEmailAndPassword(fireAuth, email, password);
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
    try {
      const createdUser = await signInWithPopup(fireAuth, provider);
      await setDoc(doc(fireStore, DOC_PROFILE, createdUser.user.uid), {
        cigPerDay: 20,
      });
    } catch (error) {
      setError(error.message);
    }
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
