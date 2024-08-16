let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let bcrypt = require("bcrypt");

let userSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
    },
    phone: {
      type: String,
      required: [true, "Phone Number is required"],
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [6, "Minimum password length is 6 characters"],
    },
    role: {
      type: String,
      enum: ["user", "admin", "super_admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  let salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

let User = mongoose.model("user", userSchema);

module.exports = User;
