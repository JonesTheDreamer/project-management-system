import { useState } from "react";
import "../styles/login.css";
import axios from "axios";
import { UseAuth } from "../context/UserContext";
import { useNavigate } from "react-router";

function Login() {
  const auth = UseAuth();
  const nav = useNavigate();

  const login = (event) => {
    event.preventDefault();
    const loggedin = auth.handleLogin(
      event.target.email.value,
      event.target.password.value
    );
    if (loggedin) {
      nav("/");
    } else {
      alert("Log in failed");
    }
  };

  return (
    <>
      <div className="container">
        <section>
          <p className="title">Project Management System</p>
        </section>
        <section className="credentials">
          <form onSubmit={login}>
            <p>Welcome User !</p>
            <input type="text" id="email" placeholder="Email" name="email" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
            />
            <button type="submit" disabled={auth.loading}>
              Login
            </button>
          </form>
        </section>
      </div>
    </>
  );
}

export default Login;
