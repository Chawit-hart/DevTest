import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

import { BsPeopleFill } from "react-icons/bs";
import "./Sidebar.css";
import "./Dashboard.css";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก API
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <aside id="sidebar">
            <div className="sidebar-title">
              <div className="sidebar-brand">
                <h1 className="icon_header"> Dev Test </h1>
              </div>
            </div>
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <Link to="/">
                  <BsPeopleFill className="icon" /> Users
                </Link>
              </li>
              <li className="sidebar-list-item">
                <Link to="/Posts">
                  <BsPeopleFill className="icon" /> Posts
                </Link>
              </li>
            </ul>
          </aside>
        </Grid>
        <Grid item xs={12} sm={6} md={9}>
          <div className="user-list mt-4">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search Name..."
                className="search-input"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-icon">
              <i className="fas fa-search"></i>
              </div>
            </div>
            <h2 className="mb-3">User Listing</h2>
            <ul className="list-group">
            {searchTerm === ""
    ? users.map((user) => (
        <li
          key={user.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {user.name} - {user.email}
          <div>
            <Link to={`/user/${user.id}`} className="button btn btn-primary">
              Info
            </Link>
          </div>
        </li>
      ))
    : filteredUsers.length === 0
    ? <li className="list-group-item">No names matched the search term.</li> // แสดงข้อความแจ้งเตือน
    : filteredUsers.map((user) => (
        <li
          key={user.id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          {user.name} - {user.email}
          <div>
            <Link to={`/user/${user.id}`} className="button btn btn-primary">
              Info
            </Link>
          </div>
        </li>
      ))}
            </ul>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;
