import React from "react";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import * as constants from "core/constants";
import LoadingIndicator from "components/Common/LoadingIndicator";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import FreeBoardCreate from "./FreeBoardCreate";
import Navigation from "components/Nav/Navigation";

const CreateCampaign = React.lazy(() => import("routes/CreateCampaign"));
const LeaderBoard = React.lazy(() => import("routes/LeaderBoard"));
const History = React.lazy(() => import("routes/History"));
const FreeBoard = React.lazy(() => import("routes/FreeBoard"));

const AppRouter = ({ isLoggedIn }) => (
  <Router basename={process.env.PUBLIC_URL}>
    {isLoggedIn && <Navigation />}
    <div className="ms-3 me-3 mt-1 mb-3">
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path={constants.PATH_HOME} element={<Home />} />
            <Route
              path={constants.PATH_HISTORY}
              element={
                <React.Suspense fallback={<LoadingIndicator />}>
                  <History />
                </React.Suspense>
              }
            />
            <Route
              path={constants.PATH_LEADERBOARD}
              element={
                <React.Suspense fallback={<LoadingIndicator />}>
                  <LeaderBoard />
                </React.Suspense>
              }
            />
            <Route path={constants.PATH_PROFILE} element={<Profile />} />
            <Route
              path={constants.PATH_CREATE_CAMPAIGN}
              element={
                <React.Suspense fallback={<LoadingIndicator />}>
                  <CreateCampaign />
                </React.Suspense>
              }
            />
            <Route path={constants.PATH_FREEBOARD}>
              <Route
                path={constants.PATH_FREEBOARD}
                element={
                  <React.Suspense fallback={<LoadingIndicator />}>
                    <FreeBoard />
                  </React.Suspense>
                }
              />
              <Route
                path={constants.PATH_FREEBOARD_CREATE}
                element={<FreeBoardCreate />}
              />
            </Route>
            <Route
              path={constants.PATH_ANY}
              element={<Navigate replace to={constants.PATH_HOME} />}
            />
          </>
        ) : (
          <>
            <Route path={constants.PATH_HOME} exact element={<Auth />} />
            <Route
              path={constants.PATH_ANY}
              element={<Navigate replace to={constants.PATH_HOME} />}
            />
          </>
        )}
      </Routes>
    </div>
  </Router>
);

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default AppRouter;
