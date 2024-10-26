import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, 
    required: true,
    ref: 'User', 
  },
  nannyId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Nanny',
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  rate: { type: Number, required: true },
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
