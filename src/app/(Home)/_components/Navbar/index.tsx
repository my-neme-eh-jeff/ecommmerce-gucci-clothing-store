import { Search } from "lucide-react";
import NavigationTabComponents from "./NavigationTabComponents";
import LogoComponent from "./logoComponent";
import { signIn } from "@/auth";

export default function Navbar() {
	return (
		<nav className="sticky top-0 z-50 flex h-10 w-full items-stretch justify-between border-b bg-white text-xl sm:h-12 md:h-auto">
			<div className="hidden p-4 md:flex">
				<NavigationTabComponents />
			</div>
			<div className="logo flex items-center">
				<LogoComponent />
			</div>
			<div className="flex justify-stretch">
				<form
					className="flex items-center self-stretch border bg-amber-200 px-5 text-ellipsis text-sm md:text-md lg:text-lg"
					action={async () => {
						"use server";
						await signIn("google", { redirectTo: "/dashboard" });
					}}
				>
					<button type="submit">Login / SignUp</button>
				</form>
				<button
					className="flex items-center self-stretch bg-black px-6"
					type="button"
				>
					<Search color="white" />
				</button>
			</div>
		</nav>
	);
}
