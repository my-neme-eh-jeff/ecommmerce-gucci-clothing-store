"use client";

import { useEffect, useState } from "react";
import useCartStore from "@/store/CartStore";
import CartItem from "./_components/individualCartItem";
import CartSummary from "./_components/CartSummary";
import { SpinnerIcon } from "@/Assets/Icons";

export default function CartPage() {
	const { items, fetchCart, isLoading } = useCartStore();
	const [initialFetchDone, setInitialFetchDone] = useState(false);

	useEffect(() => {
		if (!initialFetchDone) {
			fetchCart().then(() => setInitialFetchDone(true));
		}
	}, [fetchCart, initialFetchDone]);

	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 pb-4 pt-5 sm:px-6 lg:max-w-7xl lg:px-8">
				<h1 className="text-center md:text-left text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
					Shopping Cart
				</h1>
				<div className="mt-5 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
					<section aria-labelledby="cart-heading" className="lg:col-span-7">
						<h2 id="cart-heading" className="sr-only">
							Items in your shopping cart
						</h2>
						{!initialFetchDone || isLoading ? (
							<div className="w-full h-[calc(100vh-200px)] flex justify-center items-center">
								<SpinnerIcon />
							</div>
						) : (
							<ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
								{items.length > 0 ? (
									items.map((item) => (
										<CartItem key={item.cart_item.id} item={item} />
									))
								) : (
									<p className="my-5">
										No Items in Cart. Checkout{" "}
										<a
											href="/products"
											className="underline underline-offset-2 font-semibold"
										>
											Products{" "}
										</a>
										to add Items
									</p>
								)}
							</ul>
						)}
					</section>
					<CartSummary />
				</div>
			</div>
		</div>
	);
}
