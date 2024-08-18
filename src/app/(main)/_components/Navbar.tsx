import { GucciLogoIcon } from "@/Assets/Icons";
import { auth, signOut } from "@/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { CircleUser, Menu, Package2 } from "lucide-react";
import Link from "next/link";
import SearchInput from "./SearchInput";

export default async function Navbar() {
	const session = await auth();
	return (
		<header className="sticky z-50 top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 backdrop-blur-2xl bg-[#fcd59e12]">
			<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 ">
				<Link
					href="/"
					className="flex items-center gap-2 text-lg font-semibold md:text-base"
				>
					<GucciLogoIcon className="h-6 w-6" />
					<span className="sr-only">CHAPA</span>
				</Link>
				<Link
					href={"/"}
					className="text-muted-foreground hover:text-foreground "
				>
					Dashboard
				</Link>
				<Link
					href={"/products"}
					className="text-muted-foreground hover:text-foreground"
				>
					Products
				</Link>
				<Link
					href={"/cart"}
					className="text-muted-foreground hover:text-foreground"
				>
					Cart
				</Link>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link
							href="#"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Package2 className="h-6 w-6" />
							<span className="sr-only">Acme Inc</span>
						</Link>
						<Link href={"/"} className="hover:text-foreground">
							Dashboard
						</Link>
						<Link
							href={"/products"}
							className="text-muted-foreground hover:text-foreground"
						>
							Products
						</Link>
						<Link
							href={"/cart"}
							className="text-muted-foreground hover:text-foreground"
						>
							Cart
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<SearchInput />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<Avatar>
								<AvatarImage src={session?.user?.image || ""} />
								<AvatarFallback />
							</Avatar>
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Settings</DropdownMenuItem>
						<DropdownMenuItem>Support</DropdownMenuItem>
						<DropdownMenuSeparator />
						<form
							className="w-[100%]"
							action={async () => {
								"use server";
								await signOut({ redirectTo: "/" });
							}}
						>
							<DropdownMenuItem>
								<button type="submit">Logout</button>
							</DropdownMenuItem>
						</form>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
}
