const mongoose = require("mongoose");

const PersonalDetailsSchema = mongoose.Schema({
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Cv Id required"],
    ref: "cvs",
  },
  jobTitle: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Please enter a valid email",
    },
    required: [true, "Email required"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const PersonalDetailsModel = mongoose.model(
  "personaldetails",
  PersonalDetailsSchema
);
module.exports = PersonalDetailsModel;
