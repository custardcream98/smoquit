import { React, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { setProfile } from "store/actions/profileAction";
import { fireAuth, fireStore } from "firebaseSetup";
import { DOC_PROFILE } from "firebaseSetup/docNames";
import AppRouter from "routes";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(fireAuth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        if (!user.displayName) {
          user.displayName = user.email.split("@")[0];
        }
        const cigPerDay = (
          await getDoc(doc(fireStore, DOC_PROFILE, user.uid))
        ).data().cigPerDay;
        dispatch(setProfile({ ...user, cigPerDay }));
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "로딩중"}
      {/* <footer>&copy; Smoquit {new Date().getFullYear()}</footer> */}
    </>
  );
};

export default App;
