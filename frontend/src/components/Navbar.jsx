import React from "react";
import "../styles/navbar.css";
import { UseAuth } from "../context/UserContext";
import axios from "axios";

export default function Navbar() {
  const auth = UseAuth();
  return (
    <>
      <nav>
        <p>Project Management System</p>
        <section className="links">
          <button onClick={() => (window.location.href = "/")}>Home</button>
          <button onClick={auth.handleLogout}>Logout</button>
        </section>
      </nav>
    </>
  );
}
