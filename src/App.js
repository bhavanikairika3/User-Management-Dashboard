import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicTabs from "./components/Tabs";
import "./App.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    await axios.post("http://localhost:3001/users", {
      ...formData,
      creation_date: formattedDate,
    });

    setFormData({
      username: "",
      email: "",
      phone: "",
      id: "",
    });
  };
  return (
    <form onSubmit={handleSubmit}className="form">
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Phone:
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        ID:
        <input
          type="text"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit">Register</button>
    </form>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [results, setResults] = useState([]);

  // MODAL OPEN OR CLOSE STATE IS STORED HERE
  const [openModal, setOpenModal] = useState(false);
  const [currentState, setCurrentState] = useState(false);

  const handleInput = (value) => {
    if (value) {
      const matchingItems = users.filter((item) =>
        item.username.startsWith(value)
      );
      setResults(matchingItems);
    } else {
      setResults([]);
    }
  };
  const openhandleModal = (data) => {
    setCurrentState(data);
    // WHEN LIST IS CLICKED, WE ARE SETTING IT TO TRUE
    setOpenModal(true);
  };

  const getUsersList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {}
  };

  const User = () => {
    return (
      <table>
        {/* MODAL */}
        {/* CONDITION FOR MODAL OPEN / CLOSE */}
        {openModal ? (
          <div className="modal">
            <div>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => setOpenModal(false)}
              >
                X
              </div>
              <div className="head">
                <span>{currentState.id}</span>
                <span>{currentState.username}</span>
                <span>{currentState.email}</span>
                <span>{currentState.phone}</span>
                <span>{currentState.creation_date}</span>
              </div>
            </div>
          </div>
        ) : null}
        <div className="head">
          <th>ID </th>
          <th>USER NAME </th>
          <th>EMAIL </th>
          <th>PHONE </th>
          <th>CREATION DATE </th>
        </div>
        {users.map((curr, i) => {
          return (
            <div className="head" onClick={() => openhandleModal(curr)}>
              <td>{curr.id}</td>
              <td>{curr.username}</td>
              <td>{curr.email}</td>
              <td>{curr.phone}</td>
              <td>{curr.creation_date}</td>
            </div>
          );
        })}
        <div>
          {results.map((curr, i) => {
            return (
              <div className="head" onClick={() => openhandleModal(curr)}>
                <span>{curr.id}</span>
                <span>{curr.username}</span>
                <span>{curr.email}</span>
                <span>{curr.phone}</span>
                <span>{curr.creation_date}</span>
              </div>
            );
          })}
        </div>
      </table>
    );
  };
  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <div>
      <BasicTabs user={<User />} accountCreation={<RegistrationForm />} />
    </div>
  );
};

export default App;
