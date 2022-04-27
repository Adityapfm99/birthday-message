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

  async cron() {
    const cityTimezones = require('city-timezones');
    const moment = require('moment-timezone');
    const users =  await this.userRepo.find();
    for (const data of users) {
        console.log(data.birthDate)
        const currDate = new Date();
        const now = moment(currDate);
        now.tz('Asia/Jakarta').format('yyyy-mm-dd');
        const employeeDateOfBirth = moment(data.birthDate);
        const isBirthday = (employeeDateOfBirth.month() == now.month() && employeeDateOfBirth.date() == now.date());
        // const cityLookup = cityTimezones.lookupViaCity('data.location')
        if (isBirthday == true) {
          // send to cron services
          const name = data.firstName + '' + data.lastName;
          const cityLookup = cityTimezones.lookupViaCity(data.location)
          const tz = cityLookup[0].timezone;
          await CronService.cronSchedule(name,tz);
        }
    }
  }

}
