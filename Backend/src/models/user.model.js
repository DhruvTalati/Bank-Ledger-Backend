const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, " Email is required for creating an account!!"],
      trim: true,
      lowercase: true,
      match: [
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      ],
      unique: [true, "Email already exists!!"],
    },
    name: {
      type: String,
      required: [true, "Name must be required for creating the account!!"],
    },
    password: {
      type: String,
      select: false,
      minlength: [6, "Password must contains at least 6 characters!!"],
      required: [true, "Password must be required for creating an account!!"],
    },
    systemUser: {
      type: Boolean,
      default: false,
      immutable: true,
      select: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  return;
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
