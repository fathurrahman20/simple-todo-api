import {Hono} from "hono";
import {RegisterUserRequest, toUserResponse} from "../model/user-model";
import {registerUser} from "../service/user-service";
import {registerSchema} from "../validation/user-validation";
import {prismaClient} from "../application/database";
import {HTTPException} from "hono/dist/types/http-exception";
import {z} from "zod";

export const userController = new Hono();

userController.post('/api/users', async (c) => {
    const request = await c.req.json() as RegisterUserRequest;

    const response = await registerUser(request);

    return c.json({
        data: response
    }, 201);
});