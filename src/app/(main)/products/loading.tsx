const ShimmerEffect = () => (
	<div className="animate-pulse bg-gray-200 h-full w-full rounded" />
);

const ProductCardSkeleton = () => (
	<div className="flex flex-col h-full min-w-[250px]">
		<div className="aspect-square mb-4">
			<ShimmerEffect />
		</div>
		<div className="flex-grow p-4">
			<div className="h-4 w-3/4 mb-2">
				<ShimmerEffect />
			</div>
			<div className="h-3 w-full mb-2">
				<ShimmerEffect />
			</div>
			<div className="h-4 w-1/2 mb-2">
				<ShimmerEffect />
			</div>
		</div>
		<div className="p-4">
			<div className="h-10 w-full">
				<ShimmerEffect />
			</div>
		</div>
	</div>
);

const SkeletonLoader = () => {
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-2 py-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
				<h2 className="mb-0 text-center text-2xl font-bold text-gray-800 md:mb-10 md:text-3xl">
					Our Products
				</h2>
				<div className="mt-4 grid grid-cols-1 gap-x-2 gap-y-10 sm:grid-cols-2 md:mt-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-5">
					{[...Array(12)].map((_, i) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<ProductCardSkeleton key={i} />
					))}
				</div>
			</div>
		</div>
	);
};

export default SkeletonLoader;
