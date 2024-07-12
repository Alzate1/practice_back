import { Controller, Get, Post, Body,Param, Delete, Put, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { users } from '@prisma/client';

@Controller('users')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Get()
  async getAllUsers(){
    return this.auth.getAllUsers()
  }
  @Post()
  async createUsers(@Body() data:users){
    if (!data.first_name || !data.last_name || !data.password || !data.username) {
      throw new BadRequestException('Faltan datos necesarios en el cuerpo de la solicitud');
    }
    return this.auth.createUsers(data)
  }
  @Get(':id')
  async getUserbyId(@Param('id') id: string){
    const usersFound = await this.auth.getUserbyId(Number(id))
    if (!usersFound)throw new NotFoundException ('User not found')
    return usersFound;

    
  }
  @Put(':id')
  async updateUsers(@Param('id') id: string, @Body() data:users){
    try {
      return await this.auth.updateUsers(Number(id), data)
      
    } catch (error) {
      throw new NotFoundException ('User does not exist')
    }
  }
  @Delete(':id')
  async deleteUsers(@Param('id') id: string){
    try {
      return await this.auth.deleteUsers(Number(id))
    } catch (error) {
      throw new NotFoundException ('User does not exist')
    }
  }

}
