"use client";
import useCartStore from "@/store/CartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function CartIcon() {
	const { items, fetchCart, getTotalUniqueItems } = useCartStore();

	useEffect(() => {
		fetchCart();
	}, [fetchCart]);

	const totalUniqueItems = getTotalUniqueItems();

	return (
		<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
			<Link
				href="/cart"
				className="relative rounded-full p-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
			>
				<span className="sr-only">View cart</span>
				{totalUniqueItems > 0 && (
					<span className="animate-bounce absolute z-50 -right-1.5 -top-1 flex h-5 min-w-3 items-center justify-center rounded-md border border-neutral-300/70 bg-[#9d4e9a12] px-1.5 text-xs text-neutral-900 shadow-md">
						{totalUniqueItems}
					</span>
				)}
				<ShoppingCart className="h-6 w-6 z-20" />
			</Link>
		</div>
	);
}
