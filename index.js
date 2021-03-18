const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json')

bot.on('ready', () => {
    console.log("Bot is online!");
}); 

bot.on('rateLimit', (rateLimitInfo) => {
    console.log("RATE LIMIT REACHED:")
    console.log(rateLimitInfo)
});

bot.login(process.env.DISCORD_EMBED_POSTER_TOKEN);

bot.on('message', (msg) => {

    let args = msg.content.substring(config.prefix.length).split(" ");

    // Prevent spam from bot
    if (msg.author.bot) return; // stops bot from replying to itself
    if (!msg.guild) return; // bot will only reply if message is sent in the guild (server)
    if (!msg.content.startsWith(config.prefix)) return; // bot will only reply if the message starts with the specified prefix

    // Handle arguments given
    switch (args[0].toLowerCase()) {

        case 'test':
            msg.channel.send("EmbedPoster is working")
                .then(message => message.delete({ timeout: 5000 })); // delete message after 5 seconds
            break;
            
        default :
            msg.channel.send(`"${args[0]}" is an invalid command.`);
    }   
});
