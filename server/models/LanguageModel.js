const mongoose = require("mongoose");

const LanguageSchema = mongoose.Schema({
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Cv Id required"],
    ref: "cvs",
  },
  name: {
    type: String,
    default: "Not specified",
  },
  level: {
    type: String,
    default: "Good working knowledge",
  },
});

let languageModel = null;

try {
  languageModel = mongoose.model("languages", LanguageSchema);
} catch (e) {
  languageModel = mongoose.model("languages");
}

module.exports = languageModel;
