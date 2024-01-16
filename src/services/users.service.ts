import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { read, write } from "../user.service";

class UsersService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(id: number) {
    if (!Number.isInteger(id)) {
      throw new Error("Wrong ID param");
    }
    const users = await read();
    // const index = users.findIndex(user => user.id === id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }
    // if (index === -1) {
    //     throw new Error('User not found');
    // }
    // res.status(200).json({data: users[index]});
    return user;
  }

  public async create(data: IUser): Promise<IUser> {
    const { email, name, age } = data;

    if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
      throw new Error("Wrong age");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Wrong email");
    }
    if (!name || name.length <= 3) {
      throw new Error("Wrong name");
    }
    const users = await read();
    const newUser = { id: users[users.length - 1].id + 1, email, name, age };
    users.push(newUser);
    await write(users);

    return newUser;
  }

  public async updateById(id: number, data: IUser): Promise<IUser> {
    const { email, age, name } = data;

    if (!Number.isInteger(id)) {
      throw new Error("Wrong ID param");
    }
    if (!age || !Number.isInteger(age) || age <= 0 || age > 100) {
      throw new Error("Wrong age");
    }
    if (!email || !email.includes("@")) {
      throw new Error("Wrong email");
    }
    if (!name || name.length <= 3) {
      throw new Error("Wrong name");
    }

    const users = await read();
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }
    user.name = name;
    user.age = age;
    user.email = email;

    await write(users);
    return user;
  }

  public async partialUpdateById(id: number, data: IUser) {
    const { email, age, name } = data;

    if (!Number.isInteger(id)) {
      throw new Error("Wrong ID param");
    }
    if (age && (!age || !Number.isInteger(age) || age <= 0 || age > 100)) {
      throw new Error("Wrong age");
    }
    if (email && (!email || !email.includes("@"))) {
      throw new Error("Wrong email");
    }
    if (name && (!name || name.length <= 3)) {
      throw new Error("Wrong name");
    }

    const users = await read();
    const user = users.find((user) => user.id === id);

    if (!user) {
      throw new Error("User not found");
    }
    if (name) user.name = name;
    if (age) user.age = age;
    if (email) user.email = email;

    await write(users);
    return user;
  }

  public async deleteById(id: number): Promise<void> {
    if (!Number.isInteger(id)) {
      throw new Error("Wrong ID param");
    }
    const users = await read();
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new Error("User not found");
    }
    users.splice(index, 1);
    await write(users);
  }
}

export const usersService = new UsersService();
