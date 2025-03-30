import { useState } from "react";
import Navbar from "./components/navbar";
import Login from "./pages/Login";
import ProjectDetails from "./pages/ProjectDetails";
import ProjectList from "./pages/ProjectList";
import { BrowserRouter, Route, Routes } from "react-router";
import AuthProvider, { UseAuth } from "./context/UserContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProjectList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
