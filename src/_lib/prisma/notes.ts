import { prisma } from "@/_lib/prisma";

export async function getNotes() {
	try {
		const notes = await prisma.note.findMany();
		return { notes };
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	} catch (error: any) {
		return { error };
	}
}
