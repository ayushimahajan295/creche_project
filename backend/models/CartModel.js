// models/CartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    nannyId: { type: mongoose.Schema.Types.ObjectId, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactEmail: { type: String, required: true },
    rate: { type: Number, required: true },
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart; // Ensure that this line exists
