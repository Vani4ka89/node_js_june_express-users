import { ApiError } from "../errors";
import {
  authRepository,
  tokenRepository,
  userRepository,
} from "../repositories";
import { ILogin, ITokenPair, ITokenPayload, IUser } from "../types";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async signUp(dto: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await passwordService.hash(dto.password);
    return await authRepository.signUp(dto, hashedPassword);
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
    const jwtTokens = tokenService.generateTokenPair({
      _userId: user._id,
    });
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });
    return jwtTokens;
  }

  public async refresh(
    oldTokenPair: ITokenPair,
    tokenPayload: ITokenPayload,
  ): Promise<ITokenPair> {
    try {
      const jwtTokens = tokenService.generateTokenPair(tokenPayload);
      return await authRepository.refresh(
        jwtTokens,
        tokenPayload,
        oldTokenPair,
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
