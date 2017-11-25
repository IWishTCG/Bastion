# Bastion  
Bastion is a [Discord](https://discordapp.com/) bot written in the NodeJS module [discord.io](https://github.com/izy521/discord.io), with a focus on functions related to the Yu-Gi-Oh! card game and a simulator of it, [YGOPro Percy](http://ygopro.co). The name comes from [an intellectual character](http://yugioh.wikia.com/wiki/Bastion_Misawa) in the related anime. All commands are case-insensitive.  
  
You can install a copy of Bastion yourself, more information on how below, but if you'd rather just use my copy, [here's](https://discordapp.com/oauth2/authorize?client_id=309187464260485130&scope=bot&permissions=52288) the invite link. For support and feedback, my Discord server is [here](https://discordapp.com/invite/GrMGspZ), and you can support me on Patreon [here]( https://www.patreon.com/alphakretinbots).  
  
## Commands  
Bastion's primary purpose is a database of card information. Basic knowledge about relevant terms will be assumed in this section and the next. Note that Bastion's prefix is customisable - more information on that in the configuration section - this section assumes the default prefix of ".".  
  
A few general notes on card searching: My copy of Bastion references a card database with official cards, including recently revealed unreleased cards, anime cards from YGOPro Percy, and custom cards from the [G2 YGO Custom Server](https://discordapp.com/invite/Vv5NnCq). Bastion will search for the nearest guess if you don't type an exact name. Bastion has a system for hardcoded shortcuts - if you type a common abbreviation for a card name, it will try to convert it to the full name. Price data comes from the [http://yugiohprices.com](http://yugiohprices.com) API. "Status" is a term I use for what YGOPro developers call "OT" - a designation that reflects whether a card is legal in the OCG, TCG, both, or other options for unofficial cards like Anime, Illegal and Custom.  
  
### Help  
Usage: `@Bastion#3599`  
  
Mentioning Bastion will provide a link to this readme.  
  
### Card Lookup  
Usage: `{card name|ID}`  
  
This command searches for a card by the name or YGOPro ID specified in the brackets and returns the card's name, all of its IDs in YGOPro, any archetypes its a member of, its status, its lowest, average, and highest prices if available, its types, its attribute if it's a monster, any stats, and its card text.  
  
As an example, `{dark magician}` returns the following output:  
![card output](/readme-images/card.png)  
  
### Card With Image  
Usage: `<card name|ID>`  
  
This command works the same way as the above command, but also displays an image of the card's artwork.  
  
As an example, `<stardust dragon>` returns the following output:  
![card image output](/readme-images/card-image.png)  
  
### .randcard  
Usage: `.randcard [opts]`  
  
The `.randcard` command will select a random card and display its information as if you searched it. The command accepts options that allow you to specify the status, level, type, or attribute of the card, as well as optionally display an image by including "image".  
  
As an example, `.randcard tcg/ocg 4 image` returns the following output:  
![.randcard output](/readme-images/randcard.png)  
  
### .script  
Usage: `.script [name|id]`  
  
The `.script` command searches for a card by name or YGOPro ID and returns a link to its script for YGOPro, as well as embedding it if short enough.  
  
As an example, `.script macro cosmos` returns the following output:  
![.script output](/readme-images/script1.png)  
![.script output 2](/readme-images/script2.png)  
  
### .matches  
Usage: `.matches [name]`  
  
The `.matches` command simulates a search for cards by name and returns the 10 closest matches for your search term, that share a status. This command ignores cards with the same name, for example alternate artworks.  
  
As an example, `.matches junk warrior` returns the following output:  
![.matches output](/readme-images/matches.png)  
  
### .set  
Usage: `.set [name|setcode]`  
  
The `.set` command searches for an archetype, or "setcode" by either its name or its hexadecimal value in YGOPro (`0xba` for example) and returns both.  
  
As an example, `.set 0xba` returns the following output:  
![.set output](/readme-images/set.png)  
  
### .trivia  
Usage: `.trivia [options]`  
For fun, Bastion can play a game where it will provide the art of a card, and players have 30 seconds to give its name, with a hint at 10 seconds. The command accepts any number of the following options:  
**Status**: By default, the game will display TCG/OCG cards, but you can specify `OCG`, `TCG`, `Anime` (which will include Video Game and Illegal cards), and `Custom`.  
**Rounds**: If you include a number as an option, the game will run that many times and track the total scores of each player over the course of the game.  
**Hard Mode**: If you include `hard` as an option, Bastion will display only a quarter of the card image, for added difficulty.  
You can end the game prematurely by typing ".tq".  
  
### .tlock  
Usage: `.tlock`  
The `.tlock` command tells Bastion that on the server you use the command, he should only allow `.trivia` in the channels in which you've used the command. Only users with the "Manage Messages" permission can use the command. You can use the command in multiple channels to allow trivia in multiple channels. Using the command in a channel already registered will remove it from the list. If there are no channels in the list, trivia will be allowed anywhere.  
  
## Installation  
If you so choose, you can run a copy of Bastion yourself! This section will assume some basic familiarity with NodeJS and the command line.  
  
All of Bastion's dependencies are properly documented in the package.json, so you can just download that, put it in a folder, and run `npm install`. To run the bot, the script expects some certain files - a configuration file, a shortcuts file, a setcodes file, and any number of SQLite databases containing card data, in the format YGOPro uses.  
  
### Configuration  
By default, the configuration file is called `config.json`, and is expected to be found in a subfolder of the local directory called `config`, i.e. `config/config.json`. The script expects `config.json` to contain a JSON object with the following properties:  
```json  
{  
	"token": "",  
	"prefix": ".",  
	"longStr": "...\n__Type \".long\" to be PMed the rest!__",  
	"randFilterAttempts": 1000,  
	"maxSearches": 3,  
	"imageUrl": "",  
	"imageUrlAnime": "",  
	"imageUrlCustom": "",  
	"imageSize": 100,  
	"scriptUrl": "",  
	"scriptUrlAnime": "",  
	"scriptUrlCustom": "",  
	"dbs": [ "cards.cdb" ],  
	"triviaTimeLimit": 30000,  
	"triviaHintTime": 10000,  
	"triviaMaxRounds": 20,  
	"triviaLocks": {}  
}  
```  
`token` is the Discord User token that the discord.io module will use to log in to Discord. You can obtain a bot token through the [Discord Developers website](https://discordapp.com/developers/applications/me/). This field is required.  
  
`prefix` is the text that Bastion will look for at the start of messages to indicate that it's a bot command. For example, if `prefix` is "b$", `.randcard` becomes `b$randcard`. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`longStr` is the message Bastion will append to an output that's split up due to violating Discord's character limit, instructing the user how to see the rest. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`randFilterAttempts` is the number of times Bastion will try to find a card matching the filters a user specifies with `.randcard` before giving up to prevent infinite loops. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`maxSearches` is the number of different cards Bastion will allow a user to search at once - if a message contains more queries, Bastion won't search anything, instead returning an error message. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`imageUrl` is a link to a source for card images - either official ones, or all of them. Bastion will append the ID of the card, then ".png". This field is optional - if it is missing, functions that require images will be disabled and the following fields will be ignored: `imageUrlAnime`, `imageUrlCustom`, `imageSize`, `triviaTimeLimit`, `triviaHintTime`, `triviaMaxRounds` and `triviaLocks`.  
  
`imageUrlAnime` is a link to a source for anime card images. Bastion will append the ID of the card, then ".png". This field is optional - if it is missing, Bastion will default to `imageUrl`.  
  
`imageUrlCustom` is a link to a source for custom card images. Bastion will append the ID of the card, then ".png". This field is optional - if it is missing, Bastion will default to `imageUrl`.  
  
`scriptUrl` is a link to a source for card scripts - either official ones, or all of them. Bastion will append the ID of the card, then ".lua". This field is optional - if it is missing, functions that require scripts will be disabled and the following fields will be ignored: `scriptUrlAnime`, and `scriptUrlCustom`.  
  
`scriptUrlAnime` is a link to a source for anime card scripts. Bastion will append the ID of the card, then ".lua". This field is optional - if it is missing, Bastion will default to `scriptUrl`.  
  
`scriptUrlCustom` is a link to a source for custom card scripts. Bastion will append the ID of the card, then ".lua". This field is optional - if it is missing, Bastion will default to `scriptUrl`.  
  
`scriptUrlBackup` is a link to a source for backup card scripts - if Bastion doesn't find a script at the first source specified, he'll try again here. Bastion will append the ID of the card, then ".lua". This field is optional - if it is missing, Bastion will not try to find backup scripts.  
  
`dbs` is an array of filenames for card databases Bastion will read, to be found in a folder called `dbs`. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`triviaTimeLimit` is the time a player has to guess the answer in the trivia game, in milliseconds. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`triviaHintTime` is the time at which Bastion will provide a hint for the player in the trivia game, in milliseconds. If it is greater than `triviaTimeLimit`, the hint will never display, which may be behaviour you desire. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`triviaMaxRounds` is the maximum number of rounds a player can set the trivia game to run for, to prevent someone from forcing it to run for an arbitrarily long time. This field is optional - if it is missing, Bastion will default to what you see above.  
  
`triviaLocks` is an object with server IDs as keys and an array of channel IDs as the properties. If a server is in the object, the trivia game can only be player in the channels listed in the array. This field is optional - if it is missing, Bastion will default to what you see above, and you can configure it through Bastion even if you don't run the copy using the `.tlock` command.  
  
### Shortcuts  
By default, the shortcut file is called `shortcuts.json`, and is expected to be found in a subfolder of the local directory called `config`, i.e. `config/shortcuts.json`. The script expects `shortcut.json` to contain a JSON array of arrays, with contents like the following:  
```json  
[  
	[  
		"A0",  
		"AbZ.",  
		"AbZ",  
		"Elemental HERO Absolute Zero"  
	],  
	[  
		"AGGD",  
		"Ancient Gear Gadjiltron Dragon"  
	],  
	...  
]```  
The final entry in each array should be the full name of a card, for which all other entries are a shortened form of. Bastion splits queries up by spaces when checking for shortcuts, so shortcuts with a space will never be matched.  
  
### Setcodes  
By default, the setcode file is called `setcodes.json`, and is expected to be found in a subfolder of the local directory called `config`, i.e. `config/setcodes.json`. The script expects `setcodes.json` to contain a object, with hexadecimal setcodes as the keys and the names of the corresponding archetypes as the values, like so:  
```json  
{  
	"0x1": "Ally of Justice",  
	"0x2": "Genex",  
	...  
}``` 
  
### Database  
  
Bastion reads card databases from SQLite databases formatted the same way as those YGOPro uses. Because of this similarity, you can copy datbases from YGOPro or edit them with programs like [DataEditorX](https://github.com/247321453/DataEditorX), so it should not be necessary to document the format here. If you do want to learn more about it, you can read [MichaelLawrenceDee's tutorial](https://www.ygopro.co/Forum/tabid/95/g/posts/t/16781/Scripting-Tutorial--CURRENTLY-INCOMPLETE#post88202) on custom card creation for YGOPro, which covers making Card Databases manually. The schema for a card database is as follows:  
```sql  
CREATE TABLE IF NOT EXISTS "datas" (  
	`id`	integer,  
	`ot`	integer,  
	`alias`	INTEGER,  
	`setcode`	integer,  
	`type`	integer,  
	`atk`	integer,  
	`def`	integer,  
	`level`	integer,  
	`race`	integer,  
	`attribute`	integer,  
	`category`	integer,  
	PRIMARY KEY(id)  
);  
CREATE TABLE IF NOT EXISTS "texts" (  
	`id`	integer,  
	`name`	TEXT,  
	`desc`	TEXT,  
	`str1`	TEXT,  
	`str2`	TEXT,  
	`str3`	TEXT,  
	`str4`	TEXT,  
	`str5`	TEXT,  
	`str6`	TEXT,  
	`str7`	TEXT,  
	`str8`	TEXT,  
	`str9`	TEXT,  
	`str10`	TEXT,  
	`str11`	TEXT,  
	`str12`	TEXT,  
	`str13`	TEXT,  
	`str14`	TEXT,  
	`str15`	TEXT,  
	`str16`	TEXT,  
	PRIMARY KEY(id)  
);  
```  
  
### To-do List   
- Add languages --Feature Simon has  
- Scripting Library --Feature Simon has  
- Add pack opening simulation -- Feature simon has, but could be improved on  
- Add OCG/Japanese prices if searching japanese language --Bonus  
- Add duel links skills --Bonus  
- Add comparison between different versions of scripts between repos --Bonus  
- Add ruling page lookup --Bonus  
- Auto CDB update --Bonus  
