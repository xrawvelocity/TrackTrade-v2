import { useAuth } from "context/authCtx";
import React, { useState } from "react";
import { Redirect, Route as BaseRoute, useLocation } from "react-router-dom";

import Loading from "./Loading";

const ProtectedRoute = ({ path, children, exact, ...props }) => {
    const location = useLocation();
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Loading />
            </div>
        );
    } else if (!currentUser?.email) {
        return (
            <Redirect
                to={{
                    pathname: "/log-in",
                    state: { referrer: location },
                }}
            />
        );
    }

    return (
        <BaseRoute path={path} exact={exact} {...props}>
            {children}
        </BaseRoute>
    );
};

export default ProtectedRoute;
