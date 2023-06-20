import { Controller, Get, Post, Patch, Delete, Put, Body, Param, ParseIntPipe } from '@nestjs/common'; //El Body es como el Request de laravel las peticiones del cliente
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateProfileDto } from './dto/create-profile.dto';

@Controller('users')
export class UsersController {


  constructor(
    private _userService: UsersService
  ){}

  @Get('json')
  async mostrarContenidoJSON() {
    const contenidoJSON = await this._userService.getAllUsers();
    return contenidoJSON;
  }

  @Get()
  getUsers(): Promise<User[]>
  {
   return this._userService.getUsers();
  }

  @Post()
  createUser(@Body() newUser: CreateUserDto)//: Promise<User>
  {
    return this._userService.createUser(newUser)
  }

  @Get(':id')
  getUser(@Param('id', ParseIntPipe) id: number)//: Promise<User> 
  {
    return this._userService.getUser(id);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this._userService.deleteUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() user: UpdateUserDto) {
    return this._userService.updateUser(id, user);
  }

  @Post(':id/profile')
  createProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() profile: CreateProfileDto
  ) {
    return this._userService.createProfile(id, profile);
  }


}
