"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface ProductCardProps {
	product: {
		id: string;
		name: string;
		description: string | null;
		price: string;
		imageUrl: string | null;
		category: string | null;
		stock: number;
		createdAt: Date | null;
		updatedAt: Date | null;
	};
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
	const [isLoading, setIsLoading] = useState(false);

	const handleAddToCart = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/cart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					productId: product.id,
					quantity: 1,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to add to cart");
			}

			// You could add a toast notification here to inform the user
			console.log("Added to cart successfully");
		} catch (error) {
			console.error("Error adding to cart:", error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Card className="w-full max-w-sm">
			<CardContent className="p-4">
				<Image
					src={product.imageUrl || ""}
					alt={product.name}
					width={300}
					height={300}
					className="w-full h-48 object-cover mb-4"
				/>
				<h3 className="text-lg font-semibold">{product.name}</h3>
				<p className="text-lg font-bold mt-2">₹{product.price}</p>
			</CardContent>
			<CardFooter>
				<Button
					onClick={handleAddToCart}
					className="w-full"
					disabled={isLoading}
				>
					{isLoading ? "Adding..." : "Add to Cart"}
				</Button>
			</CardFooter>
		</Card>
	);
};
