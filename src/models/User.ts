import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "You must provide a name"],
  },
  email: {
    type: String,
    required: [true, "You must provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "You must provide a password"],
  },
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
