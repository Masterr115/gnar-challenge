import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../models/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../../modules/users/dto/create/create-user.dto';

@Injectable()
export class UsersCreateService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const findUser = await this.usersRepository.findOne({
      where: { name: createUserDto.name },
    });
    if (!findUser) {
      await this.usersRepository.insert({
        name: createUserDto.name,
      });
      return {
        success: true,
      };
    } else {
      throw new BadRequestException('User already exists!');
    }
  }
}
