import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="rounded shadow-lg flex-col mx-auto mt-16 p-12 items-center justify-center w-96 ">
      <h1 className="text-center font-sans text-xl p-2 text-green-500 font-bold">
        Login
      </h1>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
