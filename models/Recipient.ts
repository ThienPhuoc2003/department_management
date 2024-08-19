// models/Recipient.js
import mongoose from 'mongoose';

const recipientSchema = new mongoose.Schema({
    name: String,
    role: String,
});

const Recipient = mongoose.models.Recipient || mongoose.model('Recipient', recipientSchema);

export default Recipient;
