import React from "react";
import PropTypes from "prop-types";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import CreateCampaign from "routes/CreateCampaign";
import LeaderBoard from "routes/LeaderBoard";
import Navigation from "components/Navigation";
import styles from "./index.module.css";

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation />}
      <div className={styles.Router}>
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/leaderboard" element={<LeaderBoard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/create" element={<CreateCampaign />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </>
          ) : (
            <>
              <Route path="/" exact element={<Auth />} />
              <Route path="/*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
