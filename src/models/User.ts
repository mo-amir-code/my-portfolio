import mongoose, { Document, Model } from "mongoose";

export interface IUser { 
    name: string
    email: string
    password: string
}


export interface IUserDocument extends IUser, Document {
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserDocument>(
    {
        name: { type: String, required: [true, "Name is required"] },
        email: { type: String, required: [true, "Email is required"] },
        password: { type: String, required: [true, "Password is required"] },
    },
    {
        timestamps: true,
    }
);


const User: Model<IUserDocument> =
    mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
