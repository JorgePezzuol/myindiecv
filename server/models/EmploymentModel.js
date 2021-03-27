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

let employmentModel = null;

try {
  employmentModel = mongoose.model("employments", EmploymentSchema);
} catch (e) {
  employmentModel = mongoose.model("employments");
}

module.exports = employmentModel;
