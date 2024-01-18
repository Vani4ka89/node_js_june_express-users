import { authRepository } from "../repositories";
import { IUser } from "../types";
import { passwordService } from "./password.service";

class AuthService {
  public async signUp(dto: Partial<IUser>) {
    const hashedPassword = await passwordService.hash(dto.password);
    return await authRepository.signUp(dto, hashedPassword);
  }
}

export const authService = new AuthService();
