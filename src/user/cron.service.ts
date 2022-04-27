const https = require('https');

export class CronService {
  constructor() {}

  static async cronSchedule(name: string, timezone: string) {
    const moment = require('moment-timezone');
    let schedule = require('node-schedule');
    let rule = new schedule.RecurrenceRule();

    // your timezone
    rule.tz = timezone;
    console.log('masukkkkk')
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
}
