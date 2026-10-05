const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  team: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
    const teams = ["web", "pixel", "creative", "express"]
      if (!teams.includes(value)) {
        throw new Error("team doesn't exist");
      }
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = Member;
