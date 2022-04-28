import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import moment = require('moment');
import { CronService } from './cron.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save([user]);
  }
 async Update(updateUserDto: UpdateUserDto) {
    const user = await this.userRepo.save(updateUserDto);
    return;
  }

  findOne(id: string) {
    return this.userRepo.findOne(id);
  }
  
  async remove(id: string) {
    const user = await this.userRepo.findOne(id);
    return this.userRepo.remove(user);
  }

}
