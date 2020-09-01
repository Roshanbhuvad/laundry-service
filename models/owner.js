const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Geolocation Schema
const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
});

const ownerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  location: {
    type: String,
    required: [true, "Location field is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  shopOpeningTime: {
    type: Number,
    required: [true, "timing is required"],
  },
  geometry: GeoSchema,
});

const laundry = mongoose.model("Owner", ownerSchema);

module.exports = laundry;
