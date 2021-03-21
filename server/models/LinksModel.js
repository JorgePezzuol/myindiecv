const mongoose = require("mongoose");

const LinksSchema = mongoose.Schema({
  cv: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Cv Id required"],
    ref: "cvs",
  },
  label: {
    type: String,
    default: "Not specified",
  },
  link: {
    type: String,
    default: "",
  },
});

let socialLinksModel = null;

try {
  socialLinksModel = mongoose.model("sociallinks", LinksSchema);
} catch (e) {
  socialLinksModel = mongoose.model("sociallinks");
}

module.exports = socialLinksModel;
