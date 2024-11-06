// models/Appointment.js
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
        nannyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Nanny',
            required: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        meetingTime: { // Ensure this field name matches what's being passed from frontend
            type: Date,
            required: true,
        },
        status: {
            type: String,
            default: 'Booked',
        },
    }, { timestamps: true });
    
const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment; // ES6 default export
