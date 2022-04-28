import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from "typeorm/repository/Repository";
import { User } from "./entities/user.entity";

const https = require('https');
@Injectable()
export class CronService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    
  ) {}


  public static async cronSchedule(name: string, timezone: string) {
    const moment = require('moment-timezone');
    let schedule = require('node-schedule');
    let rule = new schedule.RecurrenceRule();

    // your timezone
    rule.tz = timezone;
    // runs at 09:00:00 AM
    rule.second = 0;
    rule.minute = 0;
    rule.hour = 9;
    
    const datas = JSON.stringify({
      name: name,
    });
    const options = {
      hostname: 'hookb.in',
      port: 443,
      path: '/YV9GrD9yaMCQERGGdD3V',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': datas.length,
      },
    };

    // schedule
    schedule.scheduleJob(rule, function () {
      const req = https.request(options, (res) => {
        console.log('statusCode:', res.statusCode);
        console.log('headers:', res.headers);

        res.on('data', (d) => {
          process.stdout.write(d);
        });
      });

      req.on('error', (e) => {
        console.error(e);
      });

      req.write(datas);
      req.end();
      console.log(
        '###========= JOB COMPLETE ' +
          moment.utc().toDate() +
          ' ===============###',
      );
    });
  }

  public async cronProcess() {
    const cityTimezones = require('city-timezones');
    const moment = require('moment-timezone');
    const users =  await this.userRepo.find();
    for (const data of users) {
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
