import Navigation from "components/Navigation";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "routes/Profile";
import Auth from "./routes/Auth";
import Home from "./routes/Home";

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            { isLoggedIn && <Navigation />}
            <Routes>
                <>
                    { isLoggedIn ? (
                        <>
                            <Route path="/" element={<Home />} />
                            <Route path="/profile" element={<Profile />} />
                        </>
                    ) : (
                        <Route path="/" element={<Auth />} />
                    )}
                </>
            </Routes>
        </Router>
    )
}

export default AppRouter;
