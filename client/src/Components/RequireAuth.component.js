import React from "react";
import { Navigate } from "react-router-dom";
import { isUserData } from "../Services/auth.service";

const RequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = isUserData();
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
};

export default RequireAuth;