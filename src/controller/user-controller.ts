import { Hono } from "hono";
import { LoginUserRequest, RegisterUserRequest } from "../model/user-model";
import { loginUser, registerUser } from "../service/user-service";

export const userController = new Hono();

userController.post("/api/users", async (c) => {
  const request = (await c.req.json()) as RegisterUserRequest;

  const response = await registerUser(request);

  return c.json(
    {
      data: response,
    },
    201
  );
});

userController.post("/api/users/login", async (c) => {
  const request = (await c.req.json()) as LoginUserRequest;

  const response = await loginUser(request);

  return c.json(
    {
      data: response,
    },
    200
  );
});
