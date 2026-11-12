import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/bookings"
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to fetch bookings.");
        return;
      }

      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      alert("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PUT",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to cancel booking.");
        return;
      }

      alert("Booking cancelled successfully!");

      // Refresh bookings
      fetchBookings();
    } catch (error) {
      console.error("Cancellation error:", error);
      alert("Unable to connect to the server.");
    }
  };

  if (loading) {
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
          <h1>My Bookings</h1>
          <p>Loading bookings...</p>
        </main>
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

      <main className="page-container">
        <h1>My Bookings</h1>

        {bookings.length === 0 ? (
          <div className="empty-bookings">
            <h2>No bookings yet</h2>

            <p>
              You haven't booked any property yet.
            </p>

            <Link to="/properties" className="primary-btn">
              Browse Properties
            </Link>
          </div>
        ) : (
          <div className="booking-list">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking._id}>
                <h2>
                  {booking.property
                    ? booking.property.title
                    : "Property"}
                </h2>

                <p>
                  <strong>Name:</strong> {booking.name}
                </p>

                <p>
                  <strong>Email:</strong> {booking.email}
                </p>

                <p>
                  <strong>Phone:</strong> {booking.phone}
                </p>

                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(
                    booking.bookingDate
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Duration:</strong>{" "}
                  {booking.duration} month(s)
                </p>

                <p>
                  <strong>Booked On:</strong>{" "}
                  {new Date(
                    booking.createdAt
                  ).toLocaleDateString()}
                </p>

                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

                {booking.status !== "Cancelled" && (
                  <button
                    onClick={() =>
                      cancelBooking(booking._id)
                    }
                    className="cancel-btn"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default MyBookings;