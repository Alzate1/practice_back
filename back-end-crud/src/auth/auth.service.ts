import { Injectable } from '@nestjs/common';
// import { users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { users } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {
  }
  async getAllUsers(): Promise<users[]> {
    return this.prisma.users.findMany()
  }
  async getUserbyId(id: number): Promise<users> {
    return this.prisma.users.findUnique({
      where: { id: id },
    })
  }
  async createUsers(data:Partial <users> ): Promise<users> {
    const hashedPassword = await bcrypt.hash(data.password,10)
    return this.prisma.users.create({
      data:{
        ...data,
        usertype_id:1,
        state:'0',
        password:hashedPassword
      }
    })
  }
  async updateUsers(id: number, data: users): Promise<users> {
    return this.prisma.users.update({
      where: { id: id },
      data
    })
  }
  async deleteUsers(id: number): Promise<users> {
    return this.prisma.users.delete({
      where: { id: id },
    })
  }
}
