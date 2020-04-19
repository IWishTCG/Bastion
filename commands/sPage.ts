import { Message } from "eris";
import { Command } from "../modules/Command";
import { canReact } from "../modules/util";
import { stringPages, addstringButtons as addStringButtons, generateStringList } from "../modules/stringPages";

const names: string[] = ["sp", "strpage", "stringpage"];

async function func(msg: Message): Promise<void> {
	const num = /\d+/.exec(msg.content);
	if (num === null) {
		return;
	}
	const pageNumber = parseInt(num[0], 10);
	const page = stringPages[msg.channel.id];
	const curPage = page.currentPage;
	const distance = pageNumber - curPage;
	if (distance > 0) {
		page.forward(distance * 10);
	} else if (distance < 0) {
		page.back(-distance * 10);
	}
	const mes = page.msg;
	if (mes) {
		let out = mes.content;
		if (page.currentPage !== curPage) {
			out = generateStringList(msg.channel.id);
		}
		await mes.edit(out);
		if (canReact(mes)) {
			await mes.removeReactions();
			await addStringButtons(mes);
		}
	}
}

function cond(msg: Message): boolean {
	const page = stringPages[msg.channel.id];
	return msg.channel.id in stringPages && page !== undefined && page.userID === msg.author.id;
}

const desc = (prefix: string): string =>
	"Changes the page of string results," +
	` for a list being displayed by \`${prefix}strfind\`.\n` +
	"Detects edited messages.";

export const command = new Command(names, func, cond, desc, undefined, false, false, true);
