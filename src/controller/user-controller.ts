import { Hono } from "hono";
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UpdateUserRequest,
} from "../model/user-model";
import {
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../service/user-service";
import { User } from "@prisma/client";
import { prismaClient } from "../application/database";

export const userController = new Hono<{ Variables: { user: User } }>();

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

userController.use(async (c, next) => {
  const token = c.req.header("Authorization");

  const user = await getUser(token);

  c.set("user", user);

  await next();
});

userController.get("/api/users/current", async (c) => {
  const user = c.get("user") as User;

  return c.json({
    data: toUserResponse(user),
  });
});

userController.patch("/api/users/current", async (c) => {
  const user = c.get("user") as User;
  const request = (await c.req.json()) as UpdateUserRequest;

  const response = await updateUser(user, request);

  return c.json({
    data: response,
  });
});

userController.delete("/api/users/current", async (c) => {
  const user = c.get("user") as User;

  const response = await logoutUser(user);

  return c.json({
    data: response,
  });
});
