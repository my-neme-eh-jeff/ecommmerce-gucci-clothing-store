import { auth } from "@/auth";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryClientProvider from "@/providers/QueryClientProvider";
import { redirect } from "next/navigation";
import Navbar from "./_components/Navbar";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {
	const session = await auth();
	if (!session?.user) {
		redirect("/");
	}

	return (
		<ReactQueryClientProvider>
			<Toaster
				position="top-right"
				richColors
				pauseWhenPageIsHidden
				theme="light"
				duration={2000}
			/>
			<Navbar />
			<main>{children}</main>
		</ReactQueryClientProvider>
	);
}
