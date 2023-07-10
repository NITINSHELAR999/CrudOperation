import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Update() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setId(localStorage.getItem("id"));
    setName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`https://64a99dfb8b9afaf4844ae978.mockapi.io/crud-operation/${id}`, {
        name: name,
        email: email
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <div>
      <h2 style={{ paddingTop: "100px" }}>Update</h2>
      <form>
        <div className="mb-3 mt-5">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mx-0"
          onClick={handleUpdate}
        >
          Update
        </button>

        <Link to="/read">
          <button type="submit" className="btn btn-primary mx-3">
            Back
          </button>
        </Link>
      </form>
    </div>
  );
}
