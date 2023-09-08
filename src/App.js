import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import UserInfo from "./Components/UserInfo";
import Posts from "./Components/Posts";

function App() {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard users={users} />} // ส่ง users เข้าไปใน Dashboard
        />
        <Route path="/user/:userId" element={<UserInfo users={users} />} />
        <Route path="/posts" element={<Posts />} />
      </Routes>
    </Router>
  );
}

export default App;
