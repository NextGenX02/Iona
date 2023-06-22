'use strict'
/* Initialization Script
* This is where we set everything up before actually run the bot */
const log = logger.scope("Initialization")
const {initCMD} = require('./CMDHandler')
const {eventInitialize} = require('./Events')
const {Lona} = require('../client/lona')

async function initAndStart() {
    const cmd = await initCMD()
    if (cmd.status === 1) {
        log.error(`Failed to Initialize due to error in Command Handler\n${cmd.messages}`)
        process.exit(1)
    }
    const event = eventInitialize()
    if (event.status === 1) {
        log.error(`Failed to Initialize due to error in Event Handler\n${event.messages}`)
        process.exit(1)
    }
    new Lona().login(process.env.BOT_TOKEN).then()
}
exports.initAndStart = initAndStart