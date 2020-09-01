const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
  },
  password: {
    type: String,
    required: [true, "Location field is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
  },
});

module.exports = mongoose.model("Customer", customerSchema);
