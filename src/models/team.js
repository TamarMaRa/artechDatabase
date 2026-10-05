const mongoose = require("mongoose");

const Team = mongoose.model("Team", {
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      const teams = ["web", "pixel", "creative", "express"];
      if (!teams.includes(value)) {
        throw new Error("team doesn't exist");
      }
    },
  },
  head: {
    type: String,
    required: true,
    trim: true,
  },
  members: {
    type: Number,
    noscripting: true,
    default: calcMembers(),
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Member;
