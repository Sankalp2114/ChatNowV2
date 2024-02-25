import React from "react";
import { useState, useEffect } from "react";
import { usePostLoginMutation, usePostSignUpMutation } from "@/state/api";

const Login = ({ setUser, setSecret }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultLogin] = usePostLoginMutation();
  const [triggerSignUp, resultSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({ username, password });
  };

  const handleSignUp = () => {
    triggerSignUp({ username, password });
  };

  useEffect(() => {
    if (resultLogin.data?.response) {
      setUser(username);
      setSecret(password);
    } else if (resultLogin.error) {
      window.alert("Login failed. Check your username or password.");
      setPassword("");
    }
  }, [resultLogin.data, resultLogin.error]);

  useEffect(() => {
    if (resultSignUp.error && resultSignUp.error.data) {
      console.error("Signup error:", resultSignUp.error.data);
      const errorMessage =
        resultSignUp.error.data.message ||
        "Signup failed. This username may already be taken.";
      window.alert(errorMessage);
    }
  }, [resultSignUp.error]);

  const labelStyle = {
    fontWeight: 600,
    fontSize: "14px",
    margin: "0",
    color: "#E9E9E9",
    display: "block",
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2
          className="title"
          style={{ fontSize: "5em", textAlign: "center", margin: "20px" }}
        >
          ChatNow V2
        </h2>
        <p
          style={{
            fontSize: "1rem",
            fontWeight: 500,
            color: "#A5A5A5",
            textAlign: "center",
          }}
        >
          Enter your Username and Password
        </p>

        <div>
          <p style={labelStyle}>Username:</p>
          <input
            type="text"
            className="login-input"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p style={labelStyle}>Password:</p>
          <input
            type="password"
            className="login-input"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p
          className="register-change"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have an account?"
            : "Dont have an account? Signup"}
        </p>
        <div className="login-actions">
          {isRegister ? (
            <button
              type="button"
              onClick={handleSignUp}
              className="login-signup-button"
            >
              Signup
            </button>
          ) : (
            <button
              type="button"
              onClick={handleLogin}
              className="login-signup-button"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
