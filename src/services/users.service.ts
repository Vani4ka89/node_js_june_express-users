import { userRepository } from "../repositories";
import { IUser } from "../types";

class UsersService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async create(data: Partial<IUser>): Promise<IUser> {
    return await userRepository.create(data);
  }

  public async updateById(userId: string, data: IUser): Promise<IUser> {
    return await userRepository.updateById(userId, data);
  }

  // public async partialUpdateById(
  //   userId: string,
  //   data: Partial<IUser>,
  // ): Promise<IUser> {
  //   return await userRepository.partialUpdateById(userId, data);
  // }

  public async deleteById(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }
}
export const usersService = new UsersService();
