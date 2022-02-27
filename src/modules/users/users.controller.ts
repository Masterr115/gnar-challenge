import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersCreateService } from '../../services/users/users.create.service';
import { UsersUpdateService } from '../../services/users/users.update.service';
import { CreateUserDto } from './dto/create/create-user.dto';
import { UpdateUserDto } from './dto/update/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private usersCreateService: UsersCreateService,
    private usersUpdateService: UsersUpdateService,
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
}
