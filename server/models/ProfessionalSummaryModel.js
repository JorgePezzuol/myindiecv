const mongoose = require("mongoose");

const ProfessionalSummarySchema = mongoose.Schema({
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Cv Id required"],
    ref: "cvs",
  },
  description: {
    type: String,
  },
});

const ProfessionalSummaryModel = mongoose.model(
  "professionalsummaries",
  ProfessionalSummarySchema
);
module.exports = ProfessionalSummaryModel;
