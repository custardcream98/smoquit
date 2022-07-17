import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
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
        let cigPerDay = await getDoc(doc(fireStore, DOC_PROFILE, user.uid));
        cigPerDay = cigPerDay.data().cigPerDay;
        dispatch(setProfile({ ...user, cigPerDay }));
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} />
      ) : (
        <div className="d-flex flex-column min-vh-100 min-vw-100">
          <div className="d-flex flex-grow-1 justify-content-center align-items-center">
            <Spinner as="p" animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </div>
      )}
      {/* <footer>&copy; Smoquit {new Date().getFullYear()}</footer> */}
    </>
  );
};

export default App;
