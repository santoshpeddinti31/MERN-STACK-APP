import { useEffect } from "react";
import AuthStore from "../store/AuthStore";
import { Navigate } from "react-router-dom";
const RequiredAuth = (props) => {
  const store = AuthStore();

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth();
    }
  });

  if (store.loggedIn === null) {
    return (
      <div className="flex items-center justify-center min-h-screen -mt-12">
        Loading...
      </div>
    );
  }

  if (store.loggedIn === false) {
    return <Navigate to="/login" />;
  }
  return <div>{props.children}</div>;
};

export default RequiredAuth;
