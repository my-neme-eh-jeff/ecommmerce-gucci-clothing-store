"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SpinnerIcon } from "@/components/Icons";

interface Product {
	id: string;
	name: string;
	description: string | null;
	price: string;
	imageUrl: string | null;
	category: string | null;
	stock: number;
	createdAt: Date | null;
	updatedAt: Date | null;
}

interface ProductsResponse {
	products: Product[];
	nextCursor: number | null;
}

const PRODUCTS_PER_ROW = 4;
const INITIAL_ROWS = 2; 

const fetchProducts = async ({ pageParam = 0 }): Promise<ProductsResponse> => {
	const res = await fetch(
		`/api/products?cursor=${pageParam}&limit=${PRODUCTS_PER_ROW * INITIAL_ROWS}`,
	);
	if (!res.ok) throw new Error("Failed to fetch products");
	return res.json();
};

export default function ProductsPage() {
	const containerRef = useRef<HTMLDivElement>(null);

	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		status,
		isLoading,
		
	} = useInfiniteQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
		getNextPageParam: (lastPage) => lastPage.nextCursor,
		initialPageParam: 0,
	});

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ threshold: 0.5 },
		);

		if (containerRef.current) {
			observer.observe(containerRef.current);
		}

		return () => observer.disconnect();
	}, [fetchNextPage, hasNextPage, isFetchingNextPage]);

	if (isLoading) {
		return (
			<div className="w-full flex justify-center align-middle">
				<SpinnerIcon />
			</div>
		);
	}

	const products = data?.pages.flatMap((page) => page.products) || [];

	return (
		<div className="container mx-auto py-8">
			<h1 className="text-3xl font-bold mb-8">Products</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<div ref={containerRef} className="h-20 flex items-center justify-center">
				{isFetchingNextPage ? (
					<SpinnerIcon />
				) : hasNextPage ? (
					<span>Load more</span>
				) : products.length === 0 ? (
					<span>No products currently</span>
				) : (
					<span>No more products</span>
				)}
			</div>
		</div>
	);
}
