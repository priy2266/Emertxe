import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Properties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/properties"
      );

      const data = await response.json();

console.log("Properties data:", data);

      if (!response.ok) {
        alert(data.message || "Failed to fetch properties.");
        return;
      }

      setProperties(data);
    } catch (error) {
      console.error("Error fetching properties:", error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

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

      <main className="page-container">
        <h1>Available Properties</h1>

        <p className="page-description">
          Explore our available properties and find the perfect place for you.
        </p>

        {loading ? (
          <p>Loading properties...</p>
        ) : properties.length === 0 ? (
          <div className="empty-bookings">
            <h2>No properties available</h2>
            <p>There are currently no properties listed.</p>
          </div>
        ) : (
          <div className="property-grid">
            {properties.map((property) => (
              <div className="property-card" key={property._id}>
                <img
                  src={property.image}
                  alt={property.title}
                />

                <div className="property-info">
                  <h2>{property.title}</h2>

                  <p>📍 {property.location}</p>

                  <p>🏠 {property.propertyType}</p>

                  <p>🛏 {property.bedrooms} Bedrooms</p>

                  <h3>
                    ₹{property.price.toLocaleString()} / month
                  </h3>

                  <Link
                    to={`/properties/${property._id}`}
                    className="primary-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Properties;