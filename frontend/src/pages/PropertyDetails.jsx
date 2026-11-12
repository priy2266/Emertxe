import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../App.css";

function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/properties/${id}`
      );

      const data = await response.json();

      if (!response.ok) {
        setProperty(null);
        return;
      }

      setProperty(data);
    } catch (error) {
      console.error("Error fetching property:", error);
      setProperty(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="not-found">
        <h1>Loading Property...</h1>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="not-found">
        <h1>Property Not Found</h1>

        <Link to="/properties" className="primary-btn">
          Back to Properties
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

      <main className="details-container">
        <img
          src={property.image}
          alt={property.title}
          className="details-image"
        />

        <div className="details-content">
          <h1>{property.title}</h1>

          <p className="location">
            📍 {property.location}
          </p>

          <h2>
            ₹{property.price.toLocaleString()} / month
          </h2>

          <p>{property.description}</p>

          <div className="property-features">
            <div>
              <strong>Type</strong>
              <span>{property.propertyType}</span>
            </div>

            <div>
              <strong>Bedrooms</strong>
              <span>{property.bedrooms}</span>
            </div>

            <div>
              <strong>Bathrooms</strong>
              <span>{property.bathrooms}</span>
            </div>

            <div>
              <strong>Area</strong>
              <span>Available on request</span>
            </div>
          </div>

          <Link
            to={`/booking/${property._id}`}
            className="primary-btn booking-btn"
          >
            Book This Property
          </Link>
        </div>
      </main>
    </div>
  );
}

export default PropertyDetails;