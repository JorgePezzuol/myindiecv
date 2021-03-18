const mongoose = require("mongoose");

const EmploymentSchema = mongoose.Schema({
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Cv Id required"],
    ref: "cvs",
  },
  jobTitle: {
    type: String,
    default: "Not specified",
  },
  employer: {
    type: String,
    default: "",
  },
  startDate: {
    type: String,
    default: "10/10/2020",
  },
  endDate: {
    type: String,
    default: "10/10/2020",
  },
  city: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "<p></p>",
  },
});

module.exports =
  mongoose.models.employments ||
  mongoose.model("employments", EmploymentSchema);
