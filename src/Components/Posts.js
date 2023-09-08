import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Posts.css";

function Posts() {
  const [userPosts, setUserPosts] = useState([]);
  const [users, setUsers] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setUserPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user posts:", error);
      });

    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const usersData = response.data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersData);
      })
      .catch((error) => {
        console.error("Error fetching users data:", error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="posts-container">
      <h2 className="posts-header">User Posts</h2>
      <ul className="post-list">
        {currentPosts.map((post) => (
          <li key={post.id} className="post-item">
            <h3 className="post-title">{post.title}</h3>
            <p className="post-body">{post.body}</p>
            {users[post.userId] && (
              <p className="post-author">
                Posted by: {users[post.userId].name}
              </p>
            )}
          </li>
        ))}
      </ul>
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(userPosts.length / postsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
      <div className="back-to-dashboard">
        <Link to="/" className="back-to-dashboard-link">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default Posts;
