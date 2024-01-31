import { ApiError } from "../errors";
import { userRepository } from "../repositories";
import { ITokenPayload, IUser } from "../types";

class UsersService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("You cant get this user", 403);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload._userId);
    if (!user) {
      throw new ApiError("You cant get this user", 403);
    }
    return user;
  }

  public async updateMe(
    jwtPayload: ITokenPayload,
    data: Partial<IUser>,
  ): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload._userId);
    if (!user) {
      throw new ApiError("You cant update this user", 403);
    }

    return await userRepository.updateById(jwtPayload._userId, data);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    const user = userRepository.getById(jwtPayload._userId);
    if (!user) {
      throw new ApiError("You cant delete this user", 403);
    }
    await userRepository.deleteById(jwtPayload._userId);
  }
}
export const usersService = new UsersService();
