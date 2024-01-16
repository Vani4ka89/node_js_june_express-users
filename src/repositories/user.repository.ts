import { IUser } from "../interfaces/user.interface";
import { read } from "../user.service";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await read();
  }
}

export const userRepository = new UserRepository();
