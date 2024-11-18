import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { LOGIN, LOGIN_WITH_GOOGLE } from "../utils/mutations";
import Auth from "../utils/auth";
import "../styles/LoginPage.css";

function LoginPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);
  const [loginWithGoogle] = useMutation(LOGIN_WITH_GOOGLE);

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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, name, sub: googleId } = decoded;
      
      const mutationResponse = await loginWithGoogle({
        variables: { 
          email,
          name,
          googleId
        },
      });
      
      const token = mutationResponse.data.loginWithGoogle.token;
      Auth.login(token);
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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

          <div className="social-auth-buttons">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              size="large"
              text="signin_with"
              shape="rectangular"
              width="100%"
            />
          </div>

          <div className="auth-divider">
            <span>or</span>
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
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
