import { useLocation, Link } from "react-router-dom";
import LoginForm from "../components/forms/LoginForm";
import RegisterForm from "../components/forms/RegisterForm";

export const AuthPage = () => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login";
  const isRegisterRoute = location.pathname === "/register";

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <h1>{isLoginRoute ? "Sign In" : "Create Account"}</h1>

        {isLoginRoute && <LoginForm />}
        {isRegisterRoute && <RegisterForm />}

        <div className="auth-footer">
          {isLoginRoute ? (
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          ) : isRegisterRoute ? (
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};
