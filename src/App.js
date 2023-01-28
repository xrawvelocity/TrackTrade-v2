import {
    CircularProgress,
    createTheme,
    CssBaseline,
    ThemeProvider,
} from "@mui/material";
import ProtectedRoute from "components/partials/ProtectedRoute";
import Sidebar from "components/partials/Sidebar";
import { useAuth } from "context/authCtx.js";
import { Signup, Login } from "pages/auth/Auth.jsx";
import Browse from "pages/browse/Browse";
import Landing from "pages/home/Landing.jsx";
import Messages from "pages/messages/Messages.jsx";
import React from "react";
import { Route, Switch } from "react-router-dom";

import NotFound from "./pages/404/NotFound.js";
import Dashboard from "./pages/dashboard/Dashboard";
import Profile from "./pages/profile/Profile";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App = () => {
    const { loading } = useAuth();
    return (
        <ThemeProvider theme={darkTheme}>
            {loading ? (
                <div
                    style={{
                        height: "100vh",
                        width: "100vw",
                        display: "grid",
                        placeItems: "center",
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <main>
                    <CssBaseline />

                    <Sidebar />
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={(props) => <Landing {...props} />}
                        ></Route>

                        <Route
                            exact
                            path="/sign-up"
                            render={(props) => <Signup {...props} />}
                        ></Route>

                        <Route
                            exact
                            path="/log-in"
                            render={(props) => <Login {...props} />}
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
                            path="/messages"
                            render={(props) => <Messages {...props} />}
                        ></ProtectedRoute>

                        <ProtectedRoute component={NotFound} />
                    </Switch>
                </main>
            )}
        </ThemeProvider>
    );
};

export default App;
