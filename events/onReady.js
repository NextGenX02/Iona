/**
 * @author NiazTy
 */

const { Presences, Interval, Status } = require("../resources/settings.json")

module.exports = {
    name: "ready",

    execute(client) {
        setInterval(() => {
            let index = Math.floor(Math.random() * Presences.length)

            client.user.setPresence({ 
                activities: [{ 
                    name: Presences[index].name,
                    type: Presences[index].type
                }],
                status: Status
            })
        }, Interval * 1000)

        console.log(`I successfully logged in with the username: ${client.user.username}`)
    }
}