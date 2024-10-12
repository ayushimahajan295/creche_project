import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes any extra spaces from the beginning and end of the string
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // Stores the hashed password
    },
    aadharCard: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Ensures Aadhar card numbers are stored neatly
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  { timestamps: true } // Adds createdAt and updatedAt timestamps automatically
);

// Create and export the User model
const User = mongoose.model("User", userSchema);
export default User;
