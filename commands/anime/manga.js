
const { EmbedBuilder } = require("discord.js")
const { Colors } = require("../../resources/settings.json")
const { search } = require('mal-scraper')

const i18n = require("i18n")

module.exports = {
    aliases: ["m"],
	args: true,
	category: "anime",
    description: "Display a list of all commands or information contained in a specific command.",
	developerOnly: false,
	guildOnly: true,
    name: "manga",
    usage: "<args>",

    execute(message, args) {

        const name = `${args}`

        search.search("manga", {
            term: name
        }).then(data => {

            let shortDescription = data[0].shortDescription

            if (!shortDescription) {
                shortDescription = "No synopsis information has been added to this title."
            }

            const mangaDetails = new EmbedBuilder()
                    .addFields(
                        { name: "Volumes", value: data[0].vols, inline: true },
                        { name: "Start", value: data[0].startDate, inline: true },
                        { name: "Score", value: data[0].score, inline: true },
                        { name: "Chapters", value: data[0].nbChapters, inline: true },
                        { name: "End", value: data[0].endDate, inline: true },
                        { name: "Link", value: `[${data[0].title}](${data[0].url})`, inline: true },
                    )
                    .setColor(Colors.info)
                    .setDescription(`${shortDescription}\n`)
                    .setFooter({
                        text: "Data from MAL | " + "Requested by " + message.author.username,
                        iconURL: message.author.displayAvatarURL() 
                    })
                    .setTimestamp()
                    .setThumbnail(data[0].thumbnail)
                    .setTitle( `${data[0].title}`)

                    message.channel.sendTyping().then(
                        message.channel.send({ embeds: [
                            mangaDetails
                        ]
                    }))
        }).catch(err => {
            message.reply(i18n.__("commands.anime.manga.error"))

            console.error(err)
        })

    }
}