import React, { useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent: any) => {
  return function WithAuthComponent(props: any) {
    // const { user } = useAuth();

    const { isLoading, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoggedIn && !isLoading) {
        navigate("/");
      }
    }, [isLoggedIn, isLoading, navigate]);
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
