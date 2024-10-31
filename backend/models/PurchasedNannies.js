import mongoose from 'mongoose';

const purchasedNanniesSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    nannyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nanny', // Reference to the Nanny model
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const PurchasedNannies = mongoose.model('PurchasedNannies', purchasedNanniesSchema);
export default PurchasedNannies;
