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
      body.salt === undefined
        ? (body.salt = Math.random().toString(36).substring(2, 12))
        : ""; //generate random
      const newBody = { ...body, salt: body.salt };
      const password = await Bun.password.hash(
        newBody.password + newBody.salt,
        "bcrypt"
      ); //hash password
      newBody.password = password; //set password
      const user: User = await userRepository.createUser(newBody);
      return user;
    } catch (error: any) {
      return { error: error.message };
    }
  },
  {
    body: t.Object({
      username: t.String(),
      email: t.String(),
      password: t.String(),
      salt: t.Optional(t.String()),
    }),
    detail: {
        summary: "Create new User",
        description: "Create new User in deatabase"
    }
  }
);

export default UserController;
