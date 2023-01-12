import Navigation from "components/Navigation";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      {isLoggedIn && <Navigation userObj={userObj} />}
      <div
        style={{
          maxWidth: 890,
          width: "100%",
          margin: "0 auto",
          marginTop: 80,
          display: "flex",
          justifyContent: "center",
        }}>
        <Routes>
          <>
            {isLoggedIn ? (
              <>
                <Route path="/" element={<Home userObj={userObj} />} />
                <Route
                  path="/profile"
                  element={
                    <Profile userObj={userObj} refreshUser={refreshUser} />
                  }
                />
              </>
            ) : (
              <Route path="/" element={<Auth refreshUser={refreshUser} />} />
            )}
          </>
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;
