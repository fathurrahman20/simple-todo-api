import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../model/user-model";
import {
  loginSchema,
  registerSchema,
  tokenSchema,
  updateSchema,
} from "../validation/user-validation";
import { prismaClient } from "../application/database";
import { HTTPException } from "hono/http-exception";
import { User } from "@prisma/client";

export const registerUser = async (
  request: RegisterUserRequest
): Promise<UserResponse> => {
  const validatedRequest = registerSchema.parse(request);

  const existingUser = await prismaClient.user.findUnique({
    where: {
      username: validatedRequest.username,
    },
  });

  if (existingUser) {
    throw new HTTPException(400, {
      message: "Username already exists",
    });
  }

  const hashedPassword = await Bun.password.hash(validatedRequest.password, {
    algorithm: "bcrypt",
    cost: 10,
  });

  const createdUser = await prismaClient.user.create({
    data: {
      name: validatedRequest.name,
      username: validatedRequest.username,
      password: hashedPassword,
    },
  });

  return toUserResponse(createdUser);
};

export const loginUser = async (
  request: LoginUserRequest
): Promise<UserResponse> => {
  const validatedRequest = await loginSchema.parse(request);

  let user = await prismaClient.user.findUnique({
    where: {
      username: validatedRequest.username,
    },
  });

  if (!user) {
    throw new HTTPException(401, {
      message: "Username or password is wrong!",
    });
  }

  const isPasswordValid = await Bun.password.verify(
    validatedRequest.password,
    user.password,
    "bcrypt"
  );

  if (!isPasswordValid) {
    throw new HTTPException(401, {
      message: "Username or password is wrong!",
    });
  }

  user = await prismaClient.user.update({
    where: {
      username: validatedRequest.username,
    },
    data: {
      token: Bun.randomUUIDv7(),
    },
  });

  const response = toUserResponse(user);
  response.token = user.token!;

  return response;
};

export const getUser = async (
  token: string | null | undefined
): Promise<User> => {
  const { data, error } = tokenSchema.safeParse(token);

  if (error) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  const user = await prismaClient.user.findFirst({
    where: {
      token: data.token,
    },
  });

  if (!user) {
    throw new HTTPException(401, {
      message: "Unauthorized",
    });
  }

  return user;
};

export const updateUser = async (
  user: User,
  request: UpdateUserRequest
): Promise<UserResponse> => {
  const { data } = updateSchema.safeParse(user) as { data: User };

  // user.name = data?.name ?? user.name;
  if (data.name) user.name = data.name;

  if (data.password) {
    user.password = await Bun.password.hash(data.password, {
      algorithm: "bcrypt",
      cost: 10,
    });
  }

  await prismaClient.user.update({
    where: {
      username: data.username,
    },
    data: {
      name: user.name,
      password: user.password,
    },
  });

  return toUserResponse(user);
};

export const logoutUser = async (user: User): Promise<boolean> => {
  await prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: {
      token: null,
    },
  });

  return true;
};
