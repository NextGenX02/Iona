const {Signale} = require('signale')

const logger = new Signale()
/* Currently Broken */
logger.config({
    logLevel: 'info',
    displayFilename:false,
    displayTimestamp:false,
    displayDate:true
})
// Exports as Global module, so we only need to declare it once
global.logger = logger