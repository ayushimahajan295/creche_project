import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  parentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  babysitterId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Nanny", 
    required: true 
  },
  parentName: { type: String, required: true },
  babysitterName: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Cancelled"], 
    default: "Pending" 
  }
});

module.exports = mongoose.model("Booking", BookingSchema);
