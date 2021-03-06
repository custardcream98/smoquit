import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { fireAuth, fireStore } from "firebaseSetup";
import {
  DOC_PROFILE,
  DOC_CAMPAIGNS,
  DOC_CAMPAIGNS_BY_USER,
} from "firebaseSetup/docNames";
import { setProfile } from "store/actions/profileAction";
import { setCampaigns } from "store/actions/campaignsAction";
import AppRouter from "routes";
import LoadingIndicator from "components/Common/LoadingIndicator";

const App = () => {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(fireAuth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    fireAuth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
        let cigPerDay = await getDoc(doc(fireStore, DOC_PROFILE, user.uid));
        cigPerDay = cigPerDay.data().cigPerDay;
        dispatch(setProfile({ ...user, cigPerDay }));
        onSnapshot(
          collection(
            fireStore,
            DOC_CAMPAIGNS_BY_USER,
            fireAuth.currentUser.uid,
            DOC_CAMPAIGNS
          ),
          (snapshot) => {
            const campaignsArr = [];
            snapshot.forEach((doc) => campaignsArr.push(doc));
            campaignsArr.sort((a, b) => b.data().startsAt - a.data().startsAt);
            const campaignsDocArr = [];
            campaignsArr.forEach((doc) => campaignsDocArr.push(doc.data()));
            dispatch(setCampaigns({ campaigns: campaignsDocArr }));
          }
        );
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : <LoadingIndicator />}
      {/* <footer>&copy; Smoquit {new Date().getFullYear()}</footer> */}
    </>
  );
};

export default App;
