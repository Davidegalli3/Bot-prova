const {EmbedBuilder} = require("@discordjs/builders");
const {GuildMember} = require("discord.js");

module.exports = {
    name: "guildMemberAdd",
    execute(member) {
        const {user, guild} = member;
        const welcomeChannel = member.guild.channles.cache.get('');
        const welcomeMessage = `Welcome <@${member.id}> to the guild`;


        const welcomeEmbed = new EmbedBuilder()
        .setTitle("**New member**")
        .setDescription(welcomeMessage)
        .steColor(0x037821)
        .setFields({name:'Total members', value: `${guild.memberCount}`})
        .setTimestamp();

        welcomeChannel.send({embeds: [welcomeEmbed]})
    }
}