import React from "react";
import "../styles/projectcard.css";
import axios from "axios";
import { UseAuth } from "../context/UserContext";
import { Link } from "react-router";

export default function ProjectCard({ title, description, status, id }) {
  const auth = UseAuth();
  const handleUpdateStatus = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://127.0.0.1:8000/api/projects/update-status/" + id,
        {},
        {
          headers: {
            Authorization: "Bearer " + auth.token,
          },
        }
      )
      .then((response) => {
        window.location.href = "/";
      })
      .catch((e) => {
        console.log(e);

        alert("Invalid Credentials");
      });
  };

  return (
    <div className="project-card">
      <form action="">
        <p className="title">{title}</p>
        <p className="description">{description}</p>
        <div className="options">
          <Link
            to={`/projects/${id}`}
            state={{ id, title, description, status }}
            className="see-details link"
          >
            <p>See details</p>
          </Link>
          {status == "FINISHED" ? (
            <p
              style={{
                fontFamily: "Poppins",
                fontWeight: "bold",
                color: "#17B169",
              }}
            >
              Finished
            </p>
          ) : (
            <button
              type="submit"
              style={{
                backgroundColor: "#17B169",
              }}
              onClick={handleUpdateStatus}
            >
              <p>Mark as done</p>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
