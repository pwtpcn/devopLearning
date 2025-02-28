import { User } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import db from "src/repositories/database.server";

class UserRepository {
  public async createUser({
    username,
    email,
    password,
    salt,
  }: {
    username: string;
    email: string;
    password: string;
    salt: string;
  }): Promise<User> {
    try {
      // Check if email or username already exists
      const existingUser = await db.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        if (existingUser.email === email) {
          throw new Error("Email already exists");
        }
        if (existingUser.username === username) {
          throw new Error("Username already exists");
        }
      }

      const response = await db.user.create({
        data: {
          username: username,
          email: email,
          password: password,
          salt: salt,
        },
      });
      return response;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // throw new Error(error.code);
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

  public async getAllUsers(): Promise<User[]> {
    return await db.user.findMany();
  }
  
  public async getUserByID(uuid: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { uuid },
    });
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { email },
    });
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    return await db.user.findUnique({
      where: { username },
    });
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

  public async login(username: string, password: string): Promise<Partial<User|null>> {
    try {
      const loggingInUser = await this.getUserByUsername(username);

      if (!loggingInUser) {
        throw new Error("Invalid email or password");
      }

      //check if password correct
      const isValidPassword = await Bun.password.verify(
        password + loggingInUser.salt,
        loggingInUser.password
      );

      //Debugging log
      console.log("isValidPassword: ", isValidPassword);

      if (!isValidPassword) {
        console.log("Invalid email or password");
        throw new Error("Invalid email or password");
      }

      const user = await db.user.findUnique({
        where: {username: username},
        select: {
          username: true,
          email: true,
          profile_image_url: true,
          createdAt: true
        }
      })

      console.log(user);
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new Error(error.code);
      }
    }
    throw new Error("Internal Server Error");
  }
}

export default UserRepository;
