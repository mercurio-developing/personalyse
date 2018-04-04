var CronJob = require('cron').CronJob;
var worker = require('./worker.js');

var job = new CronJob({
    cronTime: '30 * * * *',  
    onTick: worker.todo(),
    start: true,
    timeZone: "America/Los_Angeles"
});

job.start();