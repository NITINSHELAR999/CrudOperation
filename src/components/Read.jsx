import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Read.css";
import { Link, useNavigate } from "react-router-dom";

export default function Read() {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [tablevalue, setTablevalue] = useState(false);

  const toggle = () => {
    setTablevalue(!tablevalue);
  };

  const getData = () => {
    axios
      .get("https://64a99dfb8b9afaf4844ae978.mockapi.io/crud-operation")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(
        `https://64a99dfb8b9afaf4844ae978.mockapi.io/crud-operation/${id}`
      )
      .then(() => {
        getData();
      });
  };

  const handledata = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  };

  const navigate = useNavigate();

  const createPage = () => {
    navigate("/");
  };

  const darklight = tablevalue
    ? "table table-striped table-hover table-dark"
    : "table table-striped table-hover";

  return (
    <div>
      <div className="btn-btn-primay">
        <button className="btn btn-primary btn-lg" onClick={createPage}>
          Create
        </button>
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            onClick={toggle}
          />
        </div>
      </div>
      <h1>Read Operation</h1>

      <table className={darklight}>
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>

        {data.map((arr) => (
          <tbody key={arr.id}>
            <tr>
              <th scope="row">{arr.id}</th>
              <td>{arr.name}</td>
              <td>{arr.email}</td>
              <td>
                <Link to="/update">
                  <button
                    className="btn btn-success"
                    onClick={() => handledata(arr.id, arr.name, arr.email)}
                  >
                    Edit
                  </button>
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(arr.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
