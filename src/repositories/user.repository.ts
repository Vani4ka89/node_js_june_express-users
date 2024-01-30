import { FilterQuery } from "mongoose";

import { ERole } from "../enums";
import { User } from "../models";
import { IUser } from "../types";

class UserRepository {
  public async signUpAdmin(
    dto: Partial<IUser>,
    hashedPassword: string,
  ): Promise<IUser> {
    return await User.create({
      ...dto,
      password: hashedPassword,
      role: ERole.ADMIN,
    });
  }

  public async signUp(
    dto: Partial<IUser>,
    hashedPassword: string,
  ): Promise<IUser> {
    return await User.create({
      ...dto,
      password: hashedPassword,
      role: ERole.ADMIN,
    });
  }
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findOne({ _id: userId });
  }

  public async getByParams(params: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(params);
  }

  public async updateById(
    userId: string,
    data: Partial<IUser>,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, data, {
      returnDocument: "after",
    });
  }

  public async deleteById(userId: string): Promise<IUser> {
    return await User.findByIdAndDelete(userId);
  }
}

export const userRepository = new UserRepository();
