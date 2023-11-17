import axios from "axios";
import React, { useEffect, useState } from "react";
import BasicTabs from "./components/Tabs";
import "./App.css";

var link = document.createElement("link");
link.href = "App.css";
link.rel = "stylesheet";
link.type = "text/css";
document.head.appendChild(link);

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
    <form onSubmit={handleSubmit}>
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
  const [openModal,setOpenModal]=useState(false)
  const openhandleModal = () => { 
    setOpenModal(true);
  }
  const getUsersList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {}
  };

  const User = () => {
    return (
      <div>
        <div className="App.css">
          <span>ID </span>
          <span>USER NAME </span>
          <span>EMAIL </span>
          <span>PHONE </span>
          <span>CREATION DATE </span>
        </div>
        {users.map((curr, i) => {
          return (
            <div className="App.css" onClick={openhandleModal}>
              <span>{curr.id}</span>
              <span>{curr.username}</span>
              <span>{curr.email}</span>
              <span>{curr.phone}</span>
              <span>{curr.creation_date}</span>
            </div>
          );
        })}
      </div>
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
