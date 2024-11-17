import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";
import "../styles/LoginPage.css";

function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleDemoLogin = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: "user@gmail.com", password: "password" },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDemoAdminLogin = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: "admin@example.com", password: "adminpassword123" },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <img
            src="/assets/loginCutout.png"
            alt="Sneaker"
            className="logsneaker-image"
          />
        </div>
        <div className="auth-form-container">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">
            Please enter your credentials to log in.
          </p>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Log In
            </button>
          </form>
          {error && (
            <div className="error-message">
              The provided credentials are incorrect
            </div>
          )}
          <div className="auth-footer">
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up
            </Link>
          </div>
          <div className="demo-login">
            <button onClick={handleDemoLogin} className="demo-button user-demo">
              Demo User Login
            </button>
            <button onClick={handleDemoAdminLogin} className="demo-button admin-demo">
              Demo Admin Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
