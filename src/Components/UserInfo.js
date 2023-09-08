import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./Userinfo.css";
import { BsPeopleFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faPhone, faMapMarkerAlt, faGlobe, faBuilding } from "@fortawesome/free-solid-svg-icons";

function UserInfo({ openSidebarToggle, OpenSidebar }) {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [showPosts, setShowPosts] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [viewPostsText, setViewPostsText] = useState("View Posts");

  useEffect(() => {
    // ดึงข้อมูลผู้ใช้จาก API โดยใช้ userId จาก URL
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);

  const handleViewPosts = () => {
    if (showPosts) {
      setShowPosts(false);
      setViewPostsText("View Posts");
    } else {
      // ดึงโพสต์ของผู้ใช้จาก API
      axios
        .get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then((response) => {
          setUserPosts(response.data);
          setShowPosts(true);
          setViewPostsText("Close Posts");
        })
        .catch((error) => {
          console.error("Error fetching user posts:", error);
        });
    }
  };

  return (
    <div>
      {user ? (
        <div className="container">
            <div className="sidebar">
            <aside
            id="sidebar"
            className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className="sidebar-title">
              <div className="sidebar-brand">
                <h1 className="icon_header"> Dev Test </h1>
              </div>
              <span className="icon close_icon" onClick={OpenSidebar}>
                X
              </span>
            </div>
            <ul className="sidebar-list">
              <li className="sidebar-list-item">
                <Link to="/">
                  <BsPeopleFill className="icon" /> Users
                </Link>
              </li>
            </ul>
          </aside>
          </div>
          <div class="header alt-header" style={{ flex: "1" }}>
            <h1>
              User Details :
            </h1>
          </div>
          <div className="personal-info">
            <strong>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
                Name:</strong> {user.name}
            <br />
            <strong>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '5px' }} />
                Username:</strong> {user.username}
            <br />
            <strong>
                <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '5px' }} />
            Email:</strong> {user.email}
            <br />
            <strong>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                Street:</strong> {user.address.street}
            <br />
            <strong>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                Suite:</strong> {user.address.suite}
            <br />
            <strong>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                City:</strong> {user.address.city}
            <br />
            <strong>
            <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px' }} />
                Zipcode:</strong> {user.address.zipcode}
            <br />
            <strong>
            <FontAwesomeIcon icon={faPhone} style={{ marginRight: '5px' }} />
                Phone:</strong> {user.phone}
            <br />
            <strong>
            <FontAwesomeIcon icon={faGlobe} style={{ marginRight: '5px' }} />
                Website:</strong> {user.website}
            <br />
          </div>
          <div className="business-info">
            <strong>
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '5px' }} />
                Company Name:</strong> {user.company.name}
            <br />
            <strong>
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '5px' }} />
                CatchPhrase:</strong> {user.company.catchPhrase}
            <br />
            <strong>
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '5px' }} />
                Business:</strong> {user.company.bs}
            <br />
          </div>
          <button className="button-89" onClick={handleViewPosts}>
            {viewPostsText}
          </button>
          {showPosts && (
            <div className="user-posts">
              <h3>User Posts</h3>
              <ul>
                {userPosts.map((post) => (
                  <li key={post.id}>
                    <h4>{post.title}</h4>
                    <p>{post.body}</p>
                  </li>
                ))}
              </ul>
              <button className="button-89" onClick={() => setShowPosts(false)}>
                Close Posts
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="UserNotFound">User not found</div>
      )}
    </div>
  );
}

export default UserInfo;
