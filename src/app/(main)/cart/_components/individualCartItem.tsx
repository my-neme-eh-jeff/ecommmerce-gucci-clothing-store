"use client";
import useCartStore, { type CartItemType } from "@/store/CartStore";
import Image from "next/image";
import QuantityButton from "./QuantityButton";
import { toast } from "sonner";
import { XIcon } from "lucide-react";
import React from "react";

const CartItem = ({ item }: { item: CartItemType }) => {
	const { removeFromCart } = useCartStore();
	const handlingRemoveFromCart = async () => {
		const toastId = toast.loading("Removing Item...");
		try {
			await removeFromCart(item.cart_item.id);
			toast.success(`Item ${item.product.name} removed from cart`, {
				id: toastId,
			});
		} catch (err) {
			toast.error("An unexpected error occurred", { id: toastId });
			console.log(err);
		}
	};

	return (
		<li className="group flex sm:py-10">
			<div className="rounded-2xl flex-shrink-0 h-auto w-[250px]">
				<Image
					src={item.product.imageUrl}
					alt={item.product.name}
					width={250}
					height={250}
					className="rounded-2xl object-cover object-center p-1 transition-all duration-300 group-hover:shadow-md group-hover:opacity-75 sm:h-48 sm:w-full sm:min-w-40"
				/>
			</div>
			<div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
				<div className="relative pr-9 sm:grid sm:grid-cols-[2fr_1fr] sm:gap-x-6 sm:pr-0">
					<div className="flex flex-col">
						<div className="flex justify-between">
							<h1 className="text-lg font-semibold text-gray-900 mb-1">
								{item.product.name}
							</h1>
						</div>
						<div className="mt-1 flex text-sm">
							<p className="text-md text-gray-500 mb-2 line-clamp-2">
								{item.product.description}
							</p>
						</div>
						<div className="flex flex-wrap items-baseline gap-2">
							<p className="mt-1 text-sm font-medium text-neutral-800 md:text-[18px]">
								₹{item.product.price}
							</p>
						</div>
					</div>
					<div className="mt-4 sm:mt-0 sm:pr-9">
						<QuantityButton
							quantity={item.cart_item.quantity}
							cartItemId={item.cart_item.id}
						/>
						<div className="absolute right-0 top-0">
							<button
								onClick={handlingRemoveFromCart}
								type="button"
								className="-m-2 inline-flex p-2 text-gray-400 outline-none hover:text-gray-500"
							>
								<span className="sr-only">Remove</span>
								<XIcon className="h-5 w-5" />
							</button>
						</div>
					</div>
				</div>
				<p className="mt-4 flex space-x-2 mr-2 justify-end text-md text-red-500">
					{item.product.stock < 10 && <span>Almost out of stock!</span>}
				</p>
			</div>
		</li>
	);
};

export default CartItem;
