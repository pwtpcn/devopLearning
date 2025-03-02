import { User } from "@prisma/client";
import Elysia, { t } from "elysia";
import UserRepository from "src/repositories/UserRepository.server";

const UserController = new Elysia({
  prefix: "/api/user",
  tags: ["User"],
});

UserController.model({
  User: t.Object({
    username: t.String(),
    email: t.String(),
    password: t.String(),
    profile_image_url: t.String(),
    salt: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  }),
});

UserController.get(
  "/getAll",
  async () => {
    const userRepository = new UserRepository();
    const users: User[] = await userRepository.getAllUsers();
    return users;
  },
  {
    detail: {
      summary: "Get All User", //API Name
      description: "Get all user from database", //API Description
    },
  }
);

UserController.get(
  "/get/:id",
  async ({ params: { id } }) => {
    const userRepository = new UserRepository();
    const user: User | null = await userRepository.getUserByID(id);
    return user ?? { error: "User not found", status: 200 };
  },
  {
    params: t.Object({ id: t.String() }),
    detail: {
      summary: "Get User By ID",
      description: "Get user by id from database",
    },
  }
);

UserController.post(
  "/create",
  async ({ body }) => {
    const userRepository = new UserRepository();
    try {
      const user: User = await userRepository.createUser(body);
      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  {
    body: t.Object({
      username: t.String({
        minLength:2,
        maxLength: 30,
        error:{
          minLenght: "Username should contain 2-30 characters",
          maxLenght: "Username should contain 2-30 characters"
        }
      }),
      email: t.String(),
      password: t.String(),
    }),
    detail: {
      summary: "Create new User",
      description: "Create new User in deatabase",
    },
  }
);

UserController.post(
  "/login",
  async ({ body }) => {
    try {
      const userRepository = new UserRepository();
      const user = await userRepository.login(body.username, body.password);
      return { message: "Login Successful", user: user };
    } catch (error: any) {
      return { error: error.message };
    }
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
    detail: {
      summary: "Login",
    },
  }
);

UserController.delete(
  "/delete",
  async ({ body }) => {
    const userRepository = new UserRepository();
    return userRepository.deleteUser(body.uuid);
  },
  {
    body: t.Object({
      uuid: t.String(),
    }),
    detail: {
      summary: "Delete User",
      description: "Delete User by Id",
    },
  }
);
export default UserController;
