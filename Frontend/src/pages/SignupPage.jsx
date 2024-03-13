import SignupForm from "../components/SignupForm";
const SignupPage = () => {
  return (
    <div className="rounded shadow-lg flex-col mx-auto mt-16 p-12 items-center justify-center w-96">
      <h1 className="text-center font-sans text-xl p-2 text-yellow-500 font-bold">
        Signup
      </h1>
      <SignupForm />
    </div>
  );
};

export default SignupPage;
