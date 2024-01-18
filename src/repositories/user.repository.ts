import { User } from "../models";
import { IUser } from "../types";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findOne({ _id: userId });
  }

  public async create(data: Partial<IUser>): Promise<IUser> {
    return await User.create(data);
  }

  public async updateById(
    userId: string,
    data: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
  }

  // public async partialUpdateById(
  //   userId: string,
  //   data: Partial<IUser>,
  // ): Promise<IUser> {
  //   return await User.findByIdAndUpdate(userId, data, {
  //     returnDocument: "after",
  //   });
  // }

  public async deleteById(userId: string): Promise<IUser> {
    return await User.findByIdAndDelete(userId);
  }
}

export const userRepository = new UserRepository();
