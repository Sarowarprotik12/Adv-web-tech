import {
    Controller,
    Post,
    Get,
    Delete,
    Body,
    Param,
    HttpException,
    HttpStatus,
    UseGuards,
  } from '@nestjs/common';
  import { UserService } from './user.service';
  import { User } from './user.entity';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  
  
  @Controller('user')
  @UseGuards(JwtAuthGuard)
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Post('create')
    async createUser(@Body() userData: Partial<User>) {
      try {
        const createdUser = await this.userService.createUser(userData);
        return {
          message: 'User created successfully',
          data: createdUser,
        };
      } catch (error) {
        console.error('User Creation Error:', error);
        throw new HttpException('Failed to create user', HttpStatus.BAD_REQUEST);
      }
    }
  
    @Get(':id')
    async getUserById(@Param('id') userId: number) {
      try {
        const user = await this.userService.getUserById(userId);
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return {
          message: 'User retrieved successfully',
          data: user,
        };
      } catch (error) {
        console.error('Get User Error:', error);
        throw error;
      }
    }
  
    @Delete(':id')
    async deleteUser(@Param('id') userId: number) {
      try {
        await this.userService.deleteUserById(userId);
        return {
          message: 'User deleted successfully',
        };
      } catch (error) {
        console.error('Delete User Error:', error);
        throw new HttpException(
          'Failed to delete user',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    @Get()
async getUsers() {
  try {
    const users = await this.userService.getAllUsers();
    return {
      message: 'Users retrieved successfully',
      data: users,
    };
  } catch (error) {
    console.error('Get Users Error:', error);
    throw new HttpException('Failed to retrieve users', HttpStatus.BAD_REQUEST);
  }
}

  }
  