import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import db from "src/repositories/database.server";

class UserRepository {
  public async createUser({
    username,
    email,
    password,
    salt,
    createdAt,
  }: {
    username: string;
    email: string;
    password: string;
    salt: string;
    createdAt: Date;
  }): Promise<User> {
    try {
      const response = await db.user.create({
        data: {
          username: username,
          email: email,
          password: password,
          salt: salt,
          createdAt: createdAt,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2002":
            throw new Error("Email already exists");
          default:
            throw new Error("Internal Server Error");
        }
      }
    }
    throw new Error("Internal Server Error");
  }

  public async getUserByID(uuid: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { uuid },
    });
  }

  public async getAllUsers(): Promise<User[]> {
    return await db.user.findMany();
  }

  public async deleteUser(id: string): Promise<User | null> {
    try {
      const response = await db.user.delete({
        where: { uuid: id },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        switch (error.code) {
          case "P2025":
            throw new Error("Record does not exists.");
          default:
            throw new Error(error.code);
        }
      }
    }
    throw new Error("Internal Server Error");
  }
}

export default UserRepository;
