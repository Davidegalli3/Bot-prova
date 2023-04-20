const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Shows you the uptime of the bot."),

    async execute(interaction) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        const emded = new EmbedBuilder()
        .setName(`__${client.user.username}'s Uptime__`)
        .setColor("Blue")
        .addFields(
            { name: "Uptime",  value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes, \`${seconds}\` seconds` }
        )
      interaction.reply({ embeds: [emded] })
    }
}