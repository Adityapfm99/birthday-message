import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put('')
  Update(@Body() updateUserDto: UpdateUserDto)  {
    return this.userService.Update(updateUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post('delete/:id')
  delete(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
