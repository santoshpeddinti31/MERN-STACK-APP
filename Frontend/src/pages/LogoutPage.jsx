import { useEffect } from "react";
import AuthStore from "../store/AuthStore";

const LogoutPage = () => {
  const store = AuthStore();

  useEffect(() => {
    store.logout();
  });
  return (
    <h1 className="flex items-center text-4xl -mt-12 font-semibold justify-center min-h-screen">
      You are now logged out.
    </h1>
  );
};

export default LogoutPage;
