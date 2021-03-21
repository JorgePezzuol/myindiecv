const mongoose = require("mongoose");

const SkillSchema = mongoose.Schema({
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
    default: "Novice",
  },
});

let skillModel = null;

try {
  skillModel = mongoose.model("skills", SkillSchema);
} catch (e) {
  skillModel = mongoose.model("skills");
}

module.exports = skillModel;
