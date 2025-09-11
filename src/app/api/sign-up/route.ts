import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

//database connection so async ka toh use hoga hi hoga

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, email, password } = await request.json();
        // console.log(username, email, password);
        const existingUserVerifyByUsername = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingUserVerifyByUsername) {
            return Response.json(
                { success: false, message: 'Username already taken' },
                { status: 400 }
            );
        }

        const existingUserVerifyByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit code

        if (existingUserVerifyByEmail) {
            if (existingUserVerifyByEmail.isVerified) {
                return Response.json(
                    { success: false, message: 'Email already registered' },
                    { status: 400 }
                );
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10); //10 is salt rounds
                existingUserVerifyByEmail.password = hashedPassword;
                existingUserVerifyByEmail.verifyCode = verifyCode;
                existingUserVerifyByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now
                await existingUserVerifyByEmail.save();
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10); //10 is salt rounds
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1); // Set expiry time to 1 hour from now

            const newUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                messages: []
            })

            await newUser.save();
        }
        //send verification email
        const emailResponse = await sendVerificationEmail(email, username, verifyCode);

        if (!emailResponse.success) {
            return Response.json(
                { success: false, message: emailResponse.message },
                { status: 500 }
            );
        }
        
        return Response.json({
            success: true, message: 'User registered successfully. Please verify your email'
        }, { status: 201 });

    } catch (error) {
        console.error('Error during sign-up:', error);
        return Response.json({ 
            success: false, 
            message: 'Internal Server Error' 
        }, { status: 500 });
    }
}
