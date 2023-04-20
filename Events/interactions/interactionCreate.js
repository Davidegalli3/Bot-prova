const {CommandInteraction} = require('discord.js');

module.exports = {
    name: "interactionCreate",

    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) {

        const command = client.commands.get(interaction.commandName);

        if (!command) {
            interaction.reply({content: "outdated command"});
        }

        command.execute(interaction, client);
    } else if (interaction.isButton()) {
      const { customid } = interaction;

      if (customid == "verify") {
        const role = interaction.guild.roles.cache.get('1095726946035441806');
        return interaction.member.roles.add(role).then((Member) => interaction.reply({content: `You have been given the role ${role}`, 
        ephemeral: true,
      }),
        );
  }
      } else {
        return;
      }
    },
};