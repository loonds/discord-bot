const express = require('express');
const { Client, GatewayIntentBits, ChannelType, Permissions } = require('discord.js');

const app = express();

// default route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Initialize Discord client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.login('MTA4MTc5OTE2NDc3OTgzMTM4Ng.GPdQiH.w_I33ol_cGvJjBa2K9wtNXoivc4oT6xiZ8tPTE');

// Create a new role and channel
app.post('/create', async (req, res) => {
  const { name, roleType } = req.body;

  try {
    // Fetch the guild to create the role and channel in
    const guild = await client.guilds.fetch('1081865368680812544');

    // Create a new role
    const role = await guild.roles.create({
      data: {
        name: roleType,
        color: 'BLUE',
        permissions: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS]
      }
    });

    // Create a new channel
    const channel = await guild.channels.create(name, {
      type: ChannelType.GUILD_TEXT,
      permissionOverwrites: [
        {
          id: guild.roles.everyone,
          deny: [Permissions.FLAGS.VIEW_CHANNEL]
        },
        {
          id: role.id,
          allow: [Permissions.FLAGS.VIEW_CHANNEL, Permissions.FLAGS.MANAGE_CHANNELS]
        }
      ]
    });

    return res.status(201).json({ channelId: channel.id, roleId: role.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create role and channel' });
  }
});

// Create an invite for a user to join a channel
app.post('/invite', async (req, res) => {
  const { channelId, roleId, email } = req.body;

  try {
    // Fetch the guild, channel, and role
    const guild = await client.guilds.fetch('INSERT_GUILD_ID_HERE');
    const channel = await guild.channels.fetch(channelId);
    const role = await guild.roles.fetch(roleId);

    // Create an invite for the user to join the channel
    const invite = await channel.createInvite({
      maxAge: 86400,
      maxUses: 1,
      targetType: 2,
      targetApplicationId: 'INSERT_APPLICATION_ID_HERE',
      targetId: role.id
    });

    return res.status(201).json({ inviteUrl: invite.url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create invite' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
