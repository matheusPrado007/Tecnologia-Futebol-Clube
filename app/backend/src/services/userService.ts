import { ModelStatic } from 'sequelize';
import IUser from '../interfaces/IUser';
import Users from '../database/models/Users';

export default class UsersService {
  constructor(private userModel:ModelStatic<Users>) {}

  async getEmail(email: string): Promise<IUser> {
    const login = await this.userModel.findOne({
      where: { email },
    });

    return login as IUser;
  }
}
