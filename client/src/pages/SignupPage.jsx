import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';
import "../styles/LoginPage.css";

function SignupPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formState, setFormState] = useState({ email: '', password: '', username: '' });
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
        },
      });
      const token = mutationResponse.data.addUser.token;
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

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-image">
          <img src="/assets/loginCutout.png" alt="Sneaker" className="logsneaker-image" />
        </div>
        <div className="auth-form-container">
          <h2>Create an Account</h2>
          <p className="auth-subtitle">Join us and start your sneaker journey.</p>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
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
              Sign Up
            </button>
          </form>
          {error && (
            <div className="error-message">
              Sign up failed. Please try again.
            </div>
          )}
          <div className="auth-footer">
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;