import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProfile } from "store/actions/profileAction";
import { fireAuth } from "firebaseSetup";
import AppRouter from "routes";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(fireAuth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    fireAuth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        dispatch(setProfile(user.providerData[0]));
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "로딩중"}
      <footer>&copy; 🚭 Smoquit {new Date().getFullYear()}</footer>
    </>
  );
};

export default App;
