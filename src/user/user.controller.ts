import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() user: User, @Res() res): Promise<void> {
    try {
      const newUser = await this.usersService.create(user);
      res.status(HttpStatus.CREATED).json({
        message: 'Usuario creado satisfactoriamente',
        user: newUser,
      });
    } catch (error) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Error creando el usuario',
        error: error.message,
      });
    }
  }
}