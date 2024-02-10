import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}
  async create(userData): Promise<User> {
    return await this.userModel.create(userData);
  }
  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async findOne(id: number): Promise<User> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }
  async update(id: number, userData: User): Promise<[number, User[]]> {
    const [affectedCount, affectedRows] = await this.userModel.update(
      userData,
      {
        where: {
          id,
        },
        returning: true,
      },
    );
    return [affectedCount, affectedRows as User[]];
  }
  async remove(id: number): Promise<User> {
    const removedUser = await this.findOne(id);
    await this.userModel.destroy({
      where: {
        id,
      },
    });
    return removedUser;
  }
}
