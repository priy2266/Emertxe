import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../App.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    duration: "1",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Get logged-in user from localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser || !storedUser.id) {
        alert("Please login before booking a property.");
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            property: id,
            user: storedUser.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            bookingDate: formData.date,
            duration: Number(formData.duration),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Booking failed.");
        return;
      }

      alert("Property booked successfully!");

      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
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

      <main className="form-container">
        <h1>Book Property</h1>

        <form onSubmit={handleSubmit} className="booking-form">
          <label>Full Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Phone Number</label>

          <input
            type="tel"
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <label>Booking Date</label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={new Date().toISOString().split("T")[0]}
            required
          />

          <label>Duration</label>

          <select
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          >
            <option value="1">1 Month</option>
            <option value="3">3 Months</option>
            <option value="6">6 Months</option>
            <option value="12">1 Year</option>
          </select>

          <button
            type="submit"
            className="primary-btn"
            disabled={loading}
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default Booking;