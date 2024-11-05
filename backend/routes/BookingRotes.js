const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create a new booking
router.post("/bookings", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all bookings
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get nannies purchased by a user
router.get("/purchased-nannies", async (req, res) => {
    const userId = req.user.id; // Assuming user ID is decoded from token
  
    try {
      const purchasedNannies = await Cart.find({ userId }).populate("nannyId");
      res.status(200).json({ success: true, nannies: purchasedNannies.map(item => item.nannyId) });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error retrieving purchased nannies." });
    }
  });
  

module.exports = router;
