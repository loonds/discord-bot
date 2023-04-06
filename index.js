const express = require('express');
const { Client, GatewayIntentBits, ChannelType, Permissions } = require('discord.js');

const app = express();

app.use(express.json());

// default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/ready", async (req, res) => {

    const { Client, GatewayIntentBits, ChannelType, PermissionsBitField } = require('discord.js');
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent], });

    client.login('MTA4MTc5OTE2NDc3OTgzMTM4Ng.GPdQiH.w_I33ol_cGvJjBa2K9wtNXoivc4oT6xiZ8tPTE');
//    client.login('MTA5MzIzMzQxMTU2NjYxMjY1MA.GWWpr1.gGgXRRFUFJMW3FEAiICJNuOxOBjcbhgFRBGXpQ');

    const channelName = req.body.name
    const roleName = req.body.roleType
//    const guild = await client.guilds.fetch("1081865368680812544")
    const guild = await client.guilds.fetch("1081865368680812544")

    guild.roles.create({
        name: roleName,
        color: 'BLUE',
        permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels]
    })
        .then(async role => {
            const { id } = role;
            const roleId = id;
            //creting channel code
            const channel = await guild.channels.create({
                name: channelName,
                type: ChannelType.GuildText,
                // permissionOverwrites: [
                //     {
                //         id: guild.roles.everyone,
                //         deny: [PermissionsBitField.Flags.ViewChannel],
                //     },
                //     {
                //         id: role.id,
                //         allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
                //     },
                // ],
            });

            return res.send({ channelId: channel.id, roleId })
        })
})
