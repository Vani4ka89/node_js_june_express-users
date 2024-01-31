import { Types } from "mongoose";

import { EEmailActions, ERole } from "../enums";
import { ApiError } from "../errors";
import { tokenRepository, userRepository } from "../repositories";
import { ILogin, ITokenPair, ITokenPayload, IUser } from "../types";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUpAdmin(dto: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await passwordService.hash(dto.password);

    return await userRepository.signUpAdmin(dto, hashedPassword);
  }

  public async signInAdmin(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getByParams({
      email: dto.email,
      role: ERole.ADMIN,
    });
    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }
    const isMatched = await passwordService.compare(
      dto.password,
      user.password,
    );
    if (!isMatched) {
      throw new ApiError("Invalid email or password", 401);
    }
    const jwtTokens = tokenService.generateTokenPair(
      {
        _userId: user._id,
        role: ERole.ADMIN,
      },
      ERole.ADMIN,
    );
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });
    return jwtTokens;
  }

  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await passwordService.hash(dto.password);

    await emailService.sendMail(dto.email, EEmailActions.WELCOME, {
      name: dto.name,
    });
    return await userRepository.signUp(dto, hashedPassword);
  }

  public async signIn(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getByParams({ email: dto.email });
    if (!user) {
      throw new ApiError("Invalid email or password", 401);
    }
    const isMatched = await passwordService.compare(
      dto.password,
      user.password,
    );
    if (!isMatched) {
      throw new ApiError("Invalid email or password", 401);
    }
    const jwtTokens = tokenService.generateTokenPair(
      {
        _userId: user._id,
        role: ERole.USER,
      },
      ERole.USER,
    );
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });
    return jwtTokens;
  }

  public async refresh(
    refreshToken: string,
    jwtPayload: ITokenPayload,
  ): Promise<ITokenPair> {
    try {
      await tokenRepository.deleteOneByParams({ refreshToken });

      const jwtTokens = tokenService.generateTokenPair(
        {
          _userId: jwtPayload._userId,
          role: jwtPayload.role,
        },
        jwtPayload.role,
      );
      await tokenRepository.create({
        ...jwtTokens,
        _userId: new Types.ObjectId(jwtPayload._userId),
      });
      return jwtTokens;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
