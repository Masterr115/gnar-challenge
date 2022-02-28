import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { Repository } from 'typeorm';
import { UsersEntity } from '../../models/users.entity';
import { FindAllUsersResponse } from '../../modules/users/dto/find/find-all-users.response';
import { PaginationDto } from '../../util/dto/pagination.dto';

@Injectable()
export class UsersFindService {
  constructor(
    @InjectRepository(UsersEntity)
    private usersRepository: Repository<UsersEntity>,
  ) {}

  async getAllUsers(paginationDto: PaginationDto) {
    const take = +paginationDto.limit || 100;
    const page = +paginationDto.page || 1;
    const skip = (page - 1) * take;

    const findUsers = await this.usersRepository
      .createQueryBuilder('users')
      .take(take)
      .skip(skip)
      .orderBy('users.createdAt', 'DESC')
      .getManyAndCount();

    const response = plainToInstance(FindAllUsersResponse, {
      users: findUsers[0],
    });

    response.pagination = {
      totalRows: +findUsers[1],
      totalPages: Math.ceil(+findUsers[1] / take),
      actualPage: page,
    };

    return response;
  }

  async findById(idUser: string) {
    return await this.usersRepository.findOne({
      where: { idUser },
    });
  }
}
