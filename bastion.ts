import { bot } from "./modules/bot";
import { cardSearch } from "./modules/cardSearch";
import { commands } from "./modules/commands";
import { config } from "./modules/configs";

bot.on("messageCreate", msg => {
    // ignore bots
    if (msg.author.bot) {
        return;
    }
    const content = msg.content.toLowerCase();
    const prefix = config.getConfig("prefix").getValue(msg);
    if (content.startsWith(prefix + "help") || msg.mentions.find(u => u.id === bot.user.id) !== undefined) {
        let out = "I am a Yu-Gi-Oh! card bot made by AlphaKretin#7990.";
        out += "\n";
        out += "Currently, this version of me is undergoing a rework that's still in development. ";
        out += "This is just a preview.";
        out += "\n";
        out += "More thorough documentation will come closer to completion, but for now, you can try searching cards ";
        out += "with the name between `{}` for embed, `<>` for mobile view, or `[]` for mobile view without images.";
        out += "\n";
        out += "I also have a few of my old commands ready, like `.randcard`, `.matches` and `.search`.";
        out += "\n";
        out += "Of course, everything has improvements over my old version. ";
        out += "You can ask Alpha for details if you're curious.";
        out += "\n";
        out += "You can watch my development as it happens, or just support it, ";
        out += "by pledging to Alpha's Patreon at https://www.patreon.com/alphakretinbots.";
        msg.channel.createMessage(out);
    }
    for (const cmd of commands) {
        for (const name of cmd.names) {
            if (content.startsWith(prefix + name)) {
                const cmdName = content.split(/ +/)[0];
                cmd.execute(msg, cmdName.endsWith(".m")).catch(e => {
                    msg.channel.createMessage("Error!\n" + e);
                });
                return;
            }
        }
    }
    cardSearch(msg).catch(e => msg.channel.createMessage("Error!\n" + e));
});
bot.connect();