const express = require('express');
const router = express.Router();
const { Client, GatewayIntentBits } = require('discord.js');

// Handle POST request to /invite-user endpoint
router.post('/', async (req, res) => {
    try {
        const client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.MessageContent
            ],
        });

        await client.login(process.env.DISCORD_TOKEN
