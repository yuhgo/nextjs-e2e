import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
	await prisma.note.create({
		data: {
			title: "Note 1",
		},
	});

	await prisma.note.create({
		data: {
			title: "Note 2",
		},
	});
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
