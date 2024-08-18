"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SpinnerIcon } from "@/Assets/Icons";
import useProductStore from "@/store/ProductStore";

interface Product {
	id: string;
	name: string;
	description: string;
	price: string;
	imageUrl: string;
	category: string;
	stock: number;
	createdAt: Date;
	updatedAt: Date;
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
	const setProducts = useProductStore((state) => state.setProducts);
	const filteredProducts = useProductStore((state) => state.filteredProducts);

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
		if (data) {
			const allProducts = data.pages.flatMap((page) => page.products);
			setProducts(allProducts);
		}
	}, [data, setProducts]);

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
			<div className="w-full min-h-screen flex justify-center align-middle place-items-center place-content-between">
				<SpinnerIcon />
			</div>
		);
	}

	const products = data?.pages.flatMap((page) => page.products) || [];

	return (
		<div className="mx-auto max-w-2xl px-2 py-4 sm:px-6 sm:py-10 md:max-w-7xl lg:max-w-[96rem] lg:px-8">
			<h1 className="mb-0 text-center text-2xl font-bold text-gray-800 md:mb-10 md:text-3xl">
				Our Products
			</h1>
			<div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-10 md:gap-x-4 md:gap-y-15 sm:grid-cols-2 md:mt-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
				{filteredProducts.map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
			<div ref={containerRef} className="h-20 flex items-center justify-center">
				{isFetchingNextPage ? (
					<SpinnerIcon
						className={`${status === "pending" && "min-h-screen place-content-center place-items-center justify-center flex"}`}
					/>
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
