import { nextAuthOptions } from "@/_lib/nextAuth/options";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
export const NavBar = async () => {
	const session = await getServerSession(nextAuthOptions);

	return (
		<header>
			<nav className="flex flex-wrap items-center bg-gray-700 p-3 font-bold text-white">
				<Link href="/" className="mr-4 inline-flex items-center p-2">
					Home
				</Link>
				<Link href="/fetch-cc" className="mr-4 inline-flex items-center p-2">
					CC_Fetch
				</Link>
				<Link href="/fetch-sc" className="mr-4 inline-flex items-center p-2">
					SC_Fetch
				</Link>
				<Link href="/task-crud" className="mr-4 inline-flex items-center p-2">
					CRUD
				</Link>

				{session?.user ? (
					<>
						{session.user.image && (
							<span className="inline-block text-white">
								<Image className="mx-2 rounded-full" alt="avatar" src={session.user.image} width={25} height={25} />
							</span>
						)}
						<span className="mx-2 font-normal">{session.user.name}</span>
						<Link href="/api/auth/signout" className="cursor-pointer font-normal text-indigo-500 hover:text-indigo-300">
							SignOut
						</Link>
					</>
				) : (
					<Link href="/api/auth/signin" className="cursor-pointer font-normal text-indigo-500 hover:text-indigo-300">
						SignIn GitHub
					</Link>
				)}
			</nav>
		</header>
	);
};
