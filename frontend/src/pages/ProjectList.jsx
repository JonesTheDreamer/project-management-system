import React, { useEffect, useState } from "react";
import { UseAuth } from "../context/UserContext";
import Navbar from "../components/navbar";
import axios from "axios";
import "../styles/projectlist.css";
import ProjectCard from "../components/ProjectCard";

export default function ProjectList() {
  const auth = UseAuth();

  useEffect(() => {
    if (!sessionStorage.getItem("token") || !auth.user) {
      window.location.href = "/login";
    }
  }, []);

  console.log(auth.user);
  console.log(auth.token);

  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/projects/", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProject(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleAddProject = (e) => {
    e.preventDefault();
    console.log(e.target.title.value);
    console.log(e.target.description.value);
    axios
      .post(
        `http://127.0.0.1:8000/api/projects/`,
        {
          title: e.target.title.value,
          description: e.target.description.value,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        window.location.href = `/`;
      })
      .catch((e) => {
        alert(
          "Fields must be filled and title must be atleast 8 characters while description must be atleast 15 characters"
        );
        console.log(e);
      });
  };

  return (
    <>
      <Navbar />
      <div className="project-list">
        <div className="add-update">
          <p className="title">Projects</p>
          <section>
            <p>Add new project</p>
            <form action="" onSubmit={handleAddProject}>
              <input
                type="text"
                id="title"
                placeholder="Project name"
                name="title"
              />
              <input
                type="text"
                id="description"
                placeholder="Description"
                name="description"
              />
              <button
                className="add-task-button"
                type="submit"
                style={{ backgroundColor: "lightgreen" }}
              >
                Add Project +
              </button>
            </form>
          </section>
        </div>
        <div className="list">
          {project.map((el) => (
            <ProjectCard
              key={el.id}
              title={el.title}
              description={el.description}
              status={el.status}
              id={el.id}
            />
          ))}
        </div>
      </div>
    </>
  );
}
