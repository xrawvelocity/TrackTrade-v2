import { useAsyncEffect } from "hooks/use-async-effect";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Route as BaseRoute, Redirect, useLocation } from "react-router-dom";
import { checkLogin } from "actions/auth";
import Loading from "./Loading";
import Flex from "./Flex";
import { useAuth } from "context/authCtx";

const ProtectedRoute = ({ path, children, exact, ...props }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
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
