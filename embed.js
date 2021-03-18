const fs = require('fs'); 
const Discord = require('discord.js');

function makeEmbed(msg, embedJsonFilePath) {
    let embedJson;

    // try to read file path given from user, throw error if not found
    try {embedJson = fs.readFileSync(`./Embeds/${embedJsonFilePath}`)}
    catch (ENOENT) {
        msg.channel.send("Couldn't find file " + embedJsonFilePath)
            .then(message => message.delete({ timeout: 5000 }))
        return false;
    }

    embedJson = JSON.parse(embedJson)
    
    // make embed
    let embed = new Discord.MessageEmbed()

    if (embedJson.hasOwnProperty("title")) embed.setTitle(embedJson.title)
    if (embedJson.hasOwnProperty("description")) embed.setDescription(embedJson.description)
    if (embedJson.hasOwnProperty("color")) embed.setColor(Number(embedJson.color))
    if (embedJson.hasOwnProperty("fields")) {
        embedJson.fields.forEach(field => {
            embed.addField(field.header, field.body) 
        });
    }

   return embed;
}

function postEmbed(msg, embedJsonFile) {
    let embed = makeEmbed(msg, embedJsonFile);
    if (embed) {
        msg.channel.send(embed)
        .then(msg => {
            embedId = msg.id
        });
    }
}

module.exports = {
    postEmbed
}