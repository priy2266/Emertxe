import { Link } from "react-router-dom";
import "../App.css";

function Home() {
  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">HomelyHub</div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/properties">Properties</Link>
          <Link to="/my-bookings">My Bookings</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/login" className="login-btn">
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Perfect Home</h1>

          <p>
            Discover comfortable, affordable and beautiful properties
            available for booking with HomelyHub.
          </p>

          <Link to="/properties" className="primary-btn">
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <h2>Why Choose HomelyHub?</h2>

        <div className="feature-container">
          <div className="feature-card">
            <h3>🏠 Wide Range of Properties</h3>
            <p>
              Choose from apartments, houses, villas and other comfortable
              properties.
            </p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Booking</h3>
            <p>
              Book your preferred property through a simple and secure
              booking process.
            </p>
          </div>

          <div className="feature-card">
            <h3>💰 Affordable Prices</h3>
            <p>
              Find properties that match your requirements and budget.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to find your next home?</h2>

        <Link to="/properties" className="primary-btn">
          Start Exploring
        </Link>
      </section>

      <footer>
        <p>© 2026 HomelyHub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;