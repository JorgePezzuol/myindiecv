const mongoose = require("mongoose");

const EducationSchema = mongoose.Schema({
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Cv Id required"],
    ref: "cvs",
  },
  school: {
    type: String,
    default: "Not specified",
  },
  degree: {
    type: String,
    default: "Not specified",
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

let educationModel = null;

try {
  educationModel = mongoose.model("educations", EducationSchema);
} catch (e) {
  educationModel = mongoose.model("educations");
}

module.exports = educationModel;
