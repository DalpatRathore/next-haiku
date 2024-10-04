import mongoose, { Document, Schema } from "mongoose";

// Define an interface for the Haiku model
interface IHaiku extends Document {
    line1: string;
    line2: string;
    line3: string;
    user: mongoose.Schema.Types.ObjectId; // Add user reference
}

// Create the Haiku Schema
const haikuSchema: Schema<IHaiku> = new Schema({
    line1: {
        type: String,
        required: true
    },
    line2: {
        type: String,
        required: true
    },
    line3: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the User model
        required: true,
        ref: 'User' // Reference name must match the User model
    },
}, { timestamps: true });

// Create the Haiku model
const HaikuModel = (mongoose.models.Haiku as mongoose.Model<IHaiku>) || mongoose.model<IHaiku>("Haiku", haikuSchema);

export default HaikuModel;
