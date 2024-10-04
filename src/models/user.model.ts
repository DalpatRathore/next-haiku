
import mongoose, { Schema, Document } from 'mongoose';

// Define an interface for the User model
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isVerified:boolean;
  profilePicture:string;
  gender: "male" |"female"
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
  profilePicture: {
    type: String,
    default: "",
   
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Gender must be either 'male' or 'female'"
    },
    required: [true, "Gender is required"]
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
},{timestamps:true});

// Create the User model
const UserModel = (mongoose.models.User as mongoose.Model<IUser>) || mongoose.model<IUser>('User', userSchema);

export default UserModel;


