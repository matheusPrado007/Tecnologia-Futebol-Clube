import { ModelStatic } from 'sequelize';
import Teams from '../database/models/Teams';

export default class TeamService {
  private model: ModelStatic<Teams>;

  constructor(model: ModelStatic<Teams>) {
    this.model = model;
  }

  async getAll(): Promise<object | void> {
    const all = await this.model.findAll();
    return all;
  }

  async getById(id: string): Promise<object | null> {
    const result = await this.model.findByPk(id);
    return result;
  }
}
