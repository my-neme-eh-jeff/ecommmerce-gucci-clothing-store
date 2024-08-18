"use client";

import { SpinnerIcon } from "@/Assets/Icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import useCartStore from "@/store/CartStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import SoldImage from "@/Assets/Images/sold.png";

interface ProductCardProps {
	product: {
		id: string;
		name: string;
		description: string;
		price: string;
		imageUrl: string;
		category: string;
		stock: number;
		createdAt: Date;
		updatedAt: Date;
	};
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [isLoading, setIsLoading] = useState(false);
	const addToCart = useCartStore((state) => state.addToCart);

	const handleAddToCart = async () => {
		const toastId = toast.loading("Adding to cart...");
		try {
			setIsLoading(true);
			await addToCart(product.id, 1);
			toast.success(`Product ${product.name} added to cart`, { id: toastId });
		} catch (error) {
			toast.error("An unexpected error occurred", { id: toastId });
			console.error("Error adding to cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="group relative h-full overflow-hidden rounded-md border hover:border-neutral-700/20 min-w-[250px]">
			<div className="aspect-square overflow-hidden transition-all duration-300 group-hover:opacity-75">
				{product.stock === 0 && (
					<div className="absolute top-2 right-2 z-40">
						<Image
							src={SoldImage}
							alt="Sold Out"
							width={75}
							height={75}
							className="z-40"
						/>
					</div>
				)}
				<Image
					src={product.imageUrl}
					alt={product.name}
					width={500}
					height={500}
					className="h-full w-full object-cover object-center transition-all duration-300 group-hover:scale-110"
				/>
			</div>
			<CardContent className="p-4">
				<h3 className="text-sm font-semibold text-gray-900 mb-1">
					{product.name}
				</h3>
				<p className="text-xs text-gray-500 mb-2 line-clamp-2">
					{product.description}
				</p>
				<p className="text-lg font-bold">₹{product.price}</p>
			</CardContent>
			<CardFooter className="p-4">
				<Button
					isLoading={isLoading}
					disabled={product.stock === 0}
					onClick={handleAddToCart}
					className="w-full flex items-center justify-center"
				>
					{isLoading && <SpinnerIcon className="mr-4 pr-4 h-4 w-4" />}
					<ShoppingCart className="mr-2 h-4 w-4" />
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	);
};
