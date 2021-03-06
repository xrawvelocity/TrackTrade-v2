import { CssBaseline } from "@mui/material";
import ProtectedRoute from "components/partials/ProtectedRoute";
import Sidebar from "components/partials/Sidebar";
import Browse from "pages/browse/Browse";
import Messages from "pages/messages/Messages.jsx";
import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./pages/404/NotFound.js";
import LogIn from "./pages/auth/LogIn";
import SignUp from "./pages/auth/SignUp";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";

const App = () => {
    return (
        <main>
            <CssBaseline />

            <Sidebar />
            <Switch>
                <Route
                    exact
                    path="/sign-up"
                    render={(props) => <SignUp {...props} />}
                ></Route>

                <Route
                    exact
                    path="/log-in"
                    render={(props) => <LogIn {...props} />}
                ></Route>

                <ProtectedRoute
                    exact
                    path={["/", "/dashboard"]}
                    render={(props) => <Dashboard {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    path="/browse"
                    render={(props) => <Browse {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    path="/profile/:userId"
                    render={(props) => <Profile {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute
                    path="/messages/:chatId"
                    render={(props) => <Messages {...props} />}
                ></ProtectedRoute>

                <ProtectedRoute component={NotFound} />
            </Switch>
        </main>
    );
};

export default App;
