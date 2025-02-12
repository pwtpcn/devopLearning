import db from "~/database.server";

interface CreateProps {
  username: string;
  email: string;
  password: string;
}

class UserRepository {
  public static async create({ username, email, password }: CreateProps) {
    const user = await db.user.create({
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    return user;
  }
}

export default UserRepository;