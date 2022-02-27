import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../../models/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from '../../modules/users/dto/update/update-user.dto';

@Injectable()
export class UsersUpdateService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async update(idUser: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.usersRepository.findOne({ where: { idUser } });

    if (findUser) {
      await this.usersRepository.update(
        { idUser },
        { name: updateUserDto.name },
      );
      return { success: true };
    } else {
      throw new NotFoundException('User not found!');
    }
  }
}
