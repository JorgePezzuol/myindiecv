const mongoose = require("mongoose");

const CvSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "User Id required"],
    ref: "users",
  },
});

const CvModel = mongoose.model("cvs", CvSchema);
module.exports = CvModel;
