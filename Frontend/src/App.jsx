import "./index.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequiredAuth";
import TodoPage from "./pages/TodoPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import LogoutPage from "./pages/LogoutPage";

function App() {
  return (
    <div className="bg-slate-200 min-h-screen ">
      <BrowserRouter>
        <div className="flex justify-between items-center">
          <header className="bg-slate-500 p-2 m-3 text-white">CRUD</header>
          <ul className=" flex items-center justify-end space-x-8 mx-6">
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/login">Login</Link>
            </li>

            <li>
              <Link to="/signup">Signup</Link>
            </li>

            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
        <Routes>
          <Route
            index
            element={
              <RequireAuth>
                <TodoPage />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
