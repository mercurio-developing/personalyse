var CronJob = require('cron').CronJob;
new CronJob('* */4 * * * *', function () {
    console.log('You will see this message every 4 minute');
}, null, true, 'America/Los_Angeles');