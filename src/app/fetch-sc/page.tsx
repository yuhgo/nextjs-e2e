import type { Note } from "@prisma/client";
import { cookies } from "next/headers";

const fetchNotes = async (token: string | undefined) => {
	const url = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}/api/notes` : `${process.env.API_URL}/notes`;

	const res = await fetch(url, {
		headers: {
			cookie: `next-auth.session-token=${token}`,
		},
	});

	if (!res.ok) {
		throw new Error("Failed to fetch data in server");
	}

	const notes: Note[] = await res.json();

	return notes;
};

export default async function FetchScPage() {
	const nextCookies = cookies();
	const token = nextCookies.get("next-auth.session-token");
	const notes = await fetchNotes(token?.value);

	return (
		<main className="flex flex-col items-center">
			<h1 className="mt-10 font-bold">Notes page by SC</h1>
			<ul className="m-3">
				{notes.map((note) => (
					<li key={note.id}>
						<p> {note.title}</p>
					</li>
				))}
			</ul>
		</main>
	);
}
