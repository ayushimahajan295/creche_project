import mongoose from "mongoose";

// Define the Nanny schema
const NannySchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    certifications: {
      type: [String], // Array of strings to store multiple certifications
    },
    profilePicture: {
      type: String, // URL or path to the nanny's profile picture
    },
    contactEmail: {
      type: String,
      required: true,
    },
    contactPhone: {
      type: String,
      required: true,
    },
    address: {
      type: String, // Address of the nanny (optional)
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create and export the Nanny model
const Nanny =mongoose.models.Nanny ||  mongoose.model("Nanny", NannySchema);
export default Nanny;

