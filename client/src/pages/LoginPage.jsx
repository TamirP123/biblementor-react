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
      <div className="animated-background">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-5"></div>
      </div>
      <div className="auth-container">
        <div className="auth-image">
          <div className="auth-image-overlay">
            <h1 className="image-title">AI-Powered Bible Study</h1>
            <p className="image-subtitle">"Your word is a lamp to my feet and a light to my path" - Psalm 119:105</p>
          </div>
        </div>
        <div className="auth-form-container">
          <div className="form-header">
            <h2>Welcome Back</h2>
            <p className="auth-subtitle">
              Continue your spiritual journey with AI-assisted Bible study
            </p>
          </div>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="auth-button">
              Sign In
            </button>
          </form>
          {error && (
            <div className="error-message">
              The provided credentials are incorrect
            </div>
          )}
          <div className="auth-footer">
            <p>Don't have an account? <Link to="/signup" className="auth-link">Sign up</Link></p>
          </div>
          <div className="demo-login">
            <button onClick={handleDemoLogin} className="demo-button user-demo">
              Try Demo Account
            </button>
            <button onClick={handleDemoAdminLogin} className="demo-button admin-demo">
              Admin Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
