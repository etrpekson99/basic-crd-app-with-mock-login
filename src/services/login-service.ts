import { users } from "./constants/login-data";

export interface LoginPayload {
  branchId: number;
  username: string;
  password: string;
}

export interface UserType {
  branchId?: number;
  password?: string;
  userName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  position?: string;
}

class LoginService {
  private validateBranchId(branchId: number) {
    return users.find((user) => {
      if (user.branchId === branchId) {
        return true;
      }
      return false;
    });
  }

  private validateUsername(username: string) {
    return users.find((user) => {
      if (user.userName === username) {
        return true;
      }
      return false;
    });
  }

  private validatePassword(password: string) {
    return users.find((user) => {
      if (user.password === password) {
        return true;
      }
      return false;
    });
  }

  private validateUserPayload(payload: LoginPayload) {
    for (const user of users) {
      const branchId = Number(payload.branchId);
      if (
        user.branchId === branchId &&
        user.userName === payload.username &&
        user.password === payload.password
      ) {
        return user;
      }
    }
  }

  async post(payload: LoginPayload) {
    const { username, password, branchId } = payload;

    const isValidCredentials = this.validateBranchId(Number(branchId)) && 
      this.validateUsername(username) && 
      this.validatePassword(password);

    const user = this.validateUserPayload(payload);

    const isValid = isValidCredentials && user;

    if (isValid) {
      return {
        status: 200,
        message: 'Log in success',
        user,
      }
    } else {
      throw new Error("Invalid credentials");
    }
  }
}

const LoginServiceInstance = new LoginService();

export default LoginServiceInstance;