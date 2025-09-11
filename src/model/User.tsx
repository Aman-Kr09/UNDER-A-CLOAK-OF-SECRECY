import mongoose, {Schema, Document} from "mongoose";


export interface Message extends Document {
    content: string;
    createdAt: Date;
}

const MessageSchema: Schema<Message> = new Schema({
    content: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now }
});


export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}

const UserSchema: Schema<User> = new Schema({
    username: { type: String, required: [true,"Username is required"], unique: true, trim: true },
    // if not fill then custom message shows usingrequired and trim removes whitespace
    email: { type: String, required: [true, "Email is required"], unique: true, match: [/\S+@\S+\.\S+/, "Email is not valid"] },
    // match: [/\S+@\S+\.\S+/, "Email is not valid"] this is done using rejex
    //  checks email is correct or not
    password: { type: String, required: [true, "Password is required"] },
    verifyCode: { type: String, required: [true, "Verify code is required"] },
    verifyCodeExpiry: { type: Date, required: [true, "Verify code expiry is required"] },
    isVerified: { type: Boolean, default: false },
    isAcceptingMessage: { type: Boolean, default: true },
    messages: { type: [MessageSchema], default: [] }
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema);
// mongoose.models.User checks if the model already exists to avoid recompilation errors in development
export default UserModel;