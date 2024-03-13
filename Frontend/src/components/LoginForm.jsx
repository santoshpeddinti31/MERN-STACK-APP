import { useState } from "react";
import AuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const store = AuthStore();
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  // login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    await store.login();
    //navigate
    navigate("/");
  };

  // password
  const togglePasswordVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div className="relative">
      <form onSubmit={handleLogin}>
        <input
          className="w-full p-2 mt-5 mb-6 rounded-md outline-none hover:outline-green-200"
          onChange={store.updateLoginForm}
          value={store.loginForm.email}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email"
        />
        <input
          className="w-full p-2 mb-6 rounded-md outline-none hover:outline-green-200"
          onChange={store.updateLoginForm}
          value={store.loginForm.password}
          type={visible ? "text" : "password"}
          name="password"
          autoComplete="password"
          placeholder="Enter your password"
        />
        <input
          className="absolute bg-green border border-red-500 left-0 mt-14 w-4 p-2 accent-green-400  rounded-md  "
          type="checkbox"
          name="check"
          id="check"
          onClick={togglePasswordVisibility}
        />
        <label
          className="absolute bg-green  left-3 mt-11 w-40 p-2  rounded-md text-xs  text-slate-500"
          htmlFor="check"
          id="check"
        >
          show password?
        </label>
        <button
          className="bg-green-300 mt-6 p-2 w-20 rounded font-sans font-thin shadow-lg"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
