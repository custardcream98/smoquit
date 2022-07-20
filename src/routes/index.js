import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoadingIndicator from "components/Common/LoadingIndicator";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import FreeBoard from "./FreeBoard";
import Navigation from "components/Nav/Navigation";

const CreateCampaign = React.lazy(() => import("routes/CreateCampaign"));
const LeaderBoard = React.lazy(() => import("routes/LeaderBoard"));
const History = React.lazy(() => import("routes/History"));

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {isLoggedIn && <Navigation />}
      <div className="ms-3 me-3 mt-1 mb-3">
        <Routes>
          {isLoggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route
                path="/history"
                element={
                  <React.Suspense fallback={<LoadingIndicator />}>
                    <History />
                  </React.Suspense>
                }
              />
              <Route
                path="/leaderboard"
                element={
                  <React.Suspense fallback={<LoadingIndicator />}>
                    <LeaderBoard />
                  </React.Suspense>
                }
              />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/create"
                element={
                  <React.Suspense fallback={<LoadingIndicator />}>
                    <CreateCampaign />
                  </React.Suspense>
                }
              />
              <Route path="/freeboard" element={<FreeBoard />} />
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
