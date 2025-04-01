import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Navbar from "../components/navbar";
import axios from "axios";
import { UseAuth } from "../context/UserContext";
import "../styles/projectdetails.css";

export default function ProjectDetails() {
  const [task, setTask] = useState([]);
  const [project, setProject] = useState([]);
  const { id } = useParams();
  const auth = UseAuth();

  useEffect(() => {
    if (!sessionStorage.getItem("token") || !auth.user) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}/tasks`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTask(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    axios
      .get(`http://127.0.0.1:8000/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProject(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleUpdateStatus = (task) => {
    // console.log(`Bearer ${auth.token}`);

    axios
      .put(
        `http://127.0.0.1:8000/api/tasks/${task}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        window.location.href = `/projects/${id}`;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDeleteTask = (task) => {
    // console.log(`Bearer ${auth.token}`);

    axios
      .delete(`http://127.0.0.1:8000/api/tasks/${task}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        window.location.href = `/projects/${id}`;
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    console.log(e.target.title.value);

    axios
      .post(
        `http://127.0.0.1:8000/api/tasks/`,
        {
          title: e.target.title.value,
          project_id: parseInt(id),
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        window.location.href = `/projects/${id}`;
      })
      .catch((e) => {
        console.log(e.response.data);
      });
  };

  return (
    <>
      <Navbar />
      <div className="project-details">
        <div className="project">
          <p style={{ fontSize: "3rem" }}>Project Details: </p>
          <p style={{ fontSize: "1.5rem" }}>{project.title}</p>
          <p style={{ fontSize: ".75rem" }}>{project.description}</p>
          <div className="add-task">
            <p>Add Task</p>
            <form action="" onSubmit={handleAddTask}>
              <input
                type="text"
                id="title"
                placeholder="Task name"
                name="title"
              />
              <button className="add-task-button" type="submit">
                Add Task +
              </button>
            </form>
          </div>
        </div>
        <div className="task-list">
          <div className="table-container">
            <div className="table-row">
              <div className="col0 col">
                <p style={{ fontWeight: "bold" }}>Status</p>
              </div>
              <div className="col1 col">
                <p style={{ fontWeight: "bold" }}>Task Name</p>
              </div>
              <div className="col2 col">
                <p style={{ fontWeight: "bold" }}>Options</p>
              </div>
            </div>
            {task.map((el) => (
              <form action="">
                <div className="table-row">
                  <div className="col0 col">
                    <div
                      className="status"
                      style={{
                        backgroundColor:
                          el.status === "FINISHED" ? "#17B169" : "#FF9913",
                      }}
                    ></div>
                  </div>
                  <div className="col1 col">
                    <p>{el.title}</p>
                  </div>
                  <div className="col2 col">
                    {el.status === "FINISHED" ? (
                      <p style={{ fontWeight: "bold", color: "#17B169" }}>
                        Finished
                      </p>
                    ) : (
                      <button
                        type="submit"
                        style={{
                          backgroundColor:
                            el.status === "FINISHED" ? "#17B169" : "#FF9913",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          handleUpdateStatus(el.id);
                        }}
                      >
                        Update to finish
                      </button>
                    )}
                    <button
                      className="delete"
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteTask(el.id);
                      }}
                    >
                      X
                    </button>
                  </div>
                </div>
              </form>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
