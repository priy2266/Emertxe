import Property from "../models/Property.js";

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();

    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch properties",
      error: error.message,
    });
  }
};

// Get one property
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch property",
      error: error.message,
    });
  }
};

// Create property
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create property",
      error: error.message,
    });
  }
};