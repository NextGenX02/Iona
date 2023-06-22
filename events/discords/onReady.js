/**
 * @author NiazTy
 *
 */

const { Presences, Interval, Status } = require("../../resources/settings.json")
const log = logger.scope("Discord | Ready")
module.exports = {
    name: "ready",
    once: false,

    execute(client) {
        setInterval(() => {
            let index = Math.floor((Math.random() * Presences.length))
            client.user.setPresence({ 
                activities: [{ 
                    name: Presences[index].name,
                    type: Presences[index].type
                }],
                status: Status
            })
        }, Interval * 1000)

        log.info(`I successfully logged in with the username: ${client.user.username}`)
    }
}