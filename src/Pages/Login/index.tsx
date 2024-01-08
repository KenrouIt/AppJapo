import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function onUserInput(e: React.FormEvent<HTMLInputElement>) {
    setUser(e.currentTarget.value);
  }

  function onPasswordInput(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function onConfirmPasswordInput(e: React.FormEvent<HTMLInputElement>) {
    setConfirmPassword(e.currentTarget.value);
  }

  function handleLogin() {
    if (password === confirmPassword) {
      navigate("/Home");
    } else {
      alert("Please, put the right password");
    }
  }

  return (
    <>
      <div>
        <p>User Name:</p>
        <input
          type="text"
          value={user}
          onInput={onUserInput}
        />
      </div>
      <div>
        <p>Password:</p>
        <input
          type="password"
          value={password}
          onInput={onPasswordInput}
        />
      </div>
      <div>
        <p>Confirm Password:</p>
        <input
          type="password"
          value={confirmPassword}
          onInput={onConfirmPasswordInput}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;