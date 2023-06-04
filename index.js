const { Client, Partials, Collection, GatewayIntentBits } = require("discord.js")
const { Token, Language } = require("./resources/settings.json")

const i18n = require("i18n")
const path = require("path")
const fs = require("fs")

const client = new Client({
    partials: [
        Partials.User,
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.Reaction,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember
    ],

    intents: [
		GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent
	]
})

i18n.configure({
    locales: ["en", "id"],
    defaultLocale: Language,
    directory: path.join(__dirname, "resources/text/lang"),
})

const eventFiles = fs.readdirSync("./events").filter((file) => file.endsWith(".js"))

for (const file of eventFiles) {
	const event = require(`./events/${file}`)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client))
	} else {
		client.on(
			event.name,
			async (...args) => await event.execute(...args, client)
		)
	}
}

client.commands = new Collection()

const commandFolders = fs.readdirSync("./commands")

for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter((file) => file.endsWith(".js"))
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`)
		client.commands.set(command.name, command)
	}
}

client.login(Token).catch(() => console.log("((ERR)) " + i18n.__("token_invalid")))