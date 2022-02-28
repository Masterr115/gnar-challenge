import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersCreateService } from '../../services/users/users.create.service';
import { UsersFindService } from '../../services/users/users.find.service';
import { UsersUpdateService } from '../../services/users/users.update.service';
import { PaginationDto } from '../../util/dto/pagination.dto';
import { CreateUserDto } from './dto/create/create-user.dto';
import { FindAllUsersResponse } from './dto/find/find-all-users.response';
import { UpdateUserDto } from './dto/update/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersCreateService: UsersCreateService,
    private usersUpdateService: UsersUpdateService,
    private usersFindService: UsersFindService,
  ) {}

  @Post('/new')
  @ApiOperation({ summary: 'Insert a new User' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  async createNewUser(@Body() createUserDto: CreateUserDto) {
    return this.usersCreateService.create(createUserDto);
  }

  @Patch('/:idUser')
  @ApiOperation({ summary: 'Update user name' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiResponse({ status: 404, description: 'Not found request' })
  async updateUser(
    @Param('idUser') idUser: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersUpdateService.update(idUser, updateUserDto);
  }

  @Get('')
  @ApiOperation({ summary: 'Get all Users' })
  @ApiResponse({
    status: 200,
    description: 'The all users record',
    type: FindAllUsersResponse,
  })
  @ApiQuery({
    name: 'page',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
  })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.usersFindService.getAllUsers({ limit, page } as PaginationDto);
  }
}
