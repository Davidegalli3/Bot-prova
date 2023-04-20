function loadCommands(client) {
    const ascii = require('ascii-table');
    const fs = require('fs');
    const table = new ascii().setHeading("commands", "Status");

    let commandsArray =[];

    const comandsFloder = fs.readdirSync('./commands');
    for (const folder of comandsFloder) {
        const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

                for (const file of commandFiles) {
            const commandFile = require(`../commands/${folder}/${file}`);
            
            const properties = { folder, ...commandFile};
            client.commands.set(commandFile.data.name, properties);

            commandsArray.push(commandFile.data.toJSON());

            table.addRow(file, "loaded");
            continue;
        }
    }

    client.application.commands.set(commandsArray);

    return console.log(table.toString(), "\n Loaded Commands");
};

module.exports = {loadCommands};