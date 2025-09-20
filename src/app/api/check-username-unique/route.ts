import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {z} from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation
})

export async function GET(request: Request) {
    // //use in all api routes
    // if (request.method !== 'GET') {
    //     return Response.json(
    //         { success: false, message: 'Method not allowed' },
    //         { status: 405 }
    //     );
    // }
    
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = { username: searchParams.get('username') };
        //validate with zod
        const result = UsernameQuerySchema.safeParse(queryParam);
        if (!result.success) {
            return Response.json(
                { success: false, message: 'Invalid username format' },
                { status: 400 }
            );
        }
        const { username } = result.data;
        UserModel.findOne({ username, isVerified: true }).then((user) => {
            if (user) {
                return Response.json(
                    { success: false, message: 'Username is already taken' },
                    { status: 409 }
                );
            }
            return Response.json({ success: true, message: 'Username is available' });
        });
    } catch (error) {
        console.error("Error checking username uniqueness:", error);
        return Response.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
