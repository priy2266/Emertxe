import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const {
      property,
      user,
      name,
      email,
      phone,
      bookingDate,
      duration,
    } = req.body;

    if (
      !property ||
      !user ||
      !name ||
      !email ||
      !phone ||
      !bookingDate ||
      !duration
    ) {
      return res.status(400).json({
        message: "All booking fields are required",
      });
    }

    const booking = await Booking.create({
      property,
      user,
      name,
      email,
      phone,
      bookingDate,
      duration,
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Booking failed",
      error: error.message,
    });
  }
};

// Get bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("property")
      .populate("user", "name email");

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      message: "Booking cancelled successfully",
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
};