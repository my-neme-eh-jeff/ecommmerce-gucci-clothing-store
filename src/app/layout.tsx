import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "GUCCI",
	description: "TASK",
	icons: {
		icon: "/favicon.png",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className="font-hoves selection:bg-amber-200 selection:text-black">
				{children}
			</body>
		</html>
	);
}
