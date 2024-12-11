import {RegisterUserRequest, toUserResponse, UserResponse} from "../model/user-model";
import {registerSchema} from "../validation/user-validation";
import {prismaClient} from "../application/database";
import {HTTPException} from "hono/http-exception";

export const registerUser = async (request: RegisterUserRequest): Promise<UserResponse> => {
    const validatedRequest = registerSchema.parse(request);

    const existingUser = await prismaClient.user.findUnique({
        where: {
            username: validatedRequest.username
        }
    });

    if (existingUser) {
        throw new HTTPException(400, {
            message: "Username already exists"
        })
    }

    const hashedPassword = await Bun.password.hash(validatedRequest.password, {
        algorithm: "bcrypt",
        cost: 10
    });

    const createdUser = await prismaClient.user.create({
        data: {
            name: validatedRequest.name,
            username: validatedRequest.username,
            password: hashedPassword
        }
    });

    return toUserResponse(createdUser);
}

