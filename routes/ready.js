const express = require('express');
const router = express.Router();
const { Client, GatewayIntentBits, ChannelType, PermissionsBitField } = require('discord.js');

// Handle POST request to /ready endpoint
console.log("Enter");
router.post('/', async (req, res) => {
    try {
        const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

        await client.login(process.env.DISCORD_TOKEN);

        const channelName = req.body.name;
        const roleName = req.body.roleType;
        const guild = await client.guilds.fetch(process.env.DISCORD_GUILD_ID);

        const role = await guild.roles.create({
            name: roleName,
            color: 'BLUE',
            permissions: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels]
        });

        const channel = await guild.channels.create({
            name: channelName,
            type: ChannelType.GuildText,
//            permissionOverwrites: [
//                {
//                    id: guild.roles.everyone,
//                    deny: [PermissionsBitField.Flags.ViewChannel],
//                },
//                {
//                    id: role.id,
//                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.ManageChannels],
//                },
//            ],
        });

        res.status(200).json({ channelId: channel.id, roleId: role.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
