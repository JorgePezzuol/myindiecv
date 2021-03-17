const mongoose = require("mongoose");

const PersonalDetailsSchema = mongoose.Schema({
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Cv Id required"],
    ref: "cvs",
  },
  jobTitle: {
    type: String,
  },
  mail: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
});

const PersonalDetailsModel = mongoose.model(
  "personaldetails",
  PersonalDetailsSchema
);

module.exports = PersonalDetailsModel;
