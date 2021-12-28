import axios from 'axios';
import { UserInterface } from "@uparm-automation/auth/auth-interfaces";

/**
 * Различные статичные методы для работы с пользовательскими данными
 */
export class UserService {
  /**
   * Получить данные пользователя
   */
  public static async getUserData(): Promise<UserInterface> {
    const getUser = await axios.get<UserInterface>('/api/auth');
    return getUser.data;
  }


  public static hasRole(user: UserInterface): boolean {
    // TODO: После реализации ролевой модели реализовать функционал
    return true;
  }
}
