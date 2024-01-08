import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import db from "../../DataBase/db";

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  function onUserInput(e: React.FormEvent<HTMLInputElement>) {
    setUser(e.currentTarget.value);
  }

  function onPasswordInput(e: React.FormEvent<HTMLInputElement>) {
    setPassword(e.currentTarget.value);
  }

  function isValidUser() {
    return db.some((entry) => entry.user === user && entry.password === password);
  }

  function handleLogin() {
    if (isValidUser()) {
      navigate("/Home");
    } else {
      alert("Your name or password is incorrect. Please check it");
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
      <button onClick={handleLogin}>Login</button>
    </>
  );
}

export default Login;