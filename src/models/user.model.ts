
import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the User model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
}

// Create the User Schema
const userSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Ensures email is unique
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],  // Basic email format validation
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  verifyCode: {
    type: String,
    required: [true, "Verify is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "Verify code is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

// Create the User model
const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', userSchema);

export default UserModel;


