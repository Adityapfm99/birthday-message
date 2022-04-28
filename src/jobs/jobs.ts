
import * as schedule from "node-schedule";

import { CronService } from '../user/cron.service';
class job {

    constructor(
    ) {

    }
    //Shop code refresh at 12:00 AM
    public async cekBirthday() {
        const rule = new schedule.RecurrenceRule();
        rule.dayOfWeek = [0, new schedule.Range(0, 6)];
        rule.hour = 12;

        rule.minute = 0;
        schedule.scheduleJob(rule, async function () {
            console.log('===========')
            await this.cronService.cronProcess();
        });
    }
}

export default new job();