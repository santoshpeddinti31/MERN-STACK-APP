import { useState } from "react";
import AuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const store = AuthStore();
  const navigate = useNavigate();
  const [valid, setValid] = useState(false);

  //create signup handler

  const handleSignup = async (e) => {
    e.preventDefault();
    await store.signup();
    navigate("/login");
  };

  const togglePassowrdVisibility = () => {
    setValid(!valid);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSignup}>
        <input
          className="w-full p-2 mt-5 mb-6 rounded-md outline-none hover:outline-yellow-200"
          onChange={store.updateSignupForm}
          value={store.signupForm.email}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
        />
        <input
          className="w-full p-2 mb-6 rounded-md outline-none hover:outline-yellow-200"
          onChange={store.updateSignupForm}
          value={store.signupForm.password}
          type={valid ? "text" : "password"}
          name="password"
          autoComplete="password"
          placeholder="Enter your password"
        />
        <input
          className="absolute bg-green border border-red-500 left-0 mt-14 w-4 p-2 accent-yellow-400  rounded-md  "
          type="checkbox"
          name="check"
          id="check"
          onClick={togglePassowrdVisibility}
        />
        <label
          className="absolute bg-green  left-3 mt-11 w-40 p-2  rounded-md text-xs  text-slate-500"
          htmlFor="check"
          id="check"
        >
          show password?
        </label>
        <button
          className="bg-yellow-300 mt-6 p-2 w-20 rounded font-sans font-thin shadow-lg"
          type="submit"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
