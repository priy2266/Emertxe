import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedIn");

    alert("Logged out successfully.");

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="not-found">
        <h1>You are not logged in</h1>

        <Link to="/login" className="primary-btn">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar">
        <div className="logo">HomelyHub</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/profile">Profile</Link>
        </div>
      </nav>

      <main className="profile-container">
        <div className="profile-card">
          <div className="profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <h1>{user.name}</h1>

          <p>{user.email}</p>

          <div className="profile-details">
            <p>
              <strong>Name:</strong> {user.name}
            </p>

            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>

          <button onClick={logout} className="cancel-btn">
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

export default Profile;