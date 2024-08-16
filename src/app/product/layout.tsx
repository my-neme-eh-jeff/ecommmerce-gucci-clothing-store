
import ReactQueryClientProvider from "@/providers/QueryClientProvider";

export default async function Layout({
	children,
}: { children: React.ReactNode }) {

	return (
		<ReactQueryClientProvider>
			<section>{children}</section>
		</ReactQueryClientProvider>
	);
}
