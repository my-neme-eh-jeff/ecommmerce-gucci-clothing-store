import { cn } from "@/lib/utils";
import type { CSSProperties } from "react";

export interface ShimmerButtonProps {
	className?: string;
	children?: React.ReactNode;
}

const ShimmerButton = ({ className, children }: ShimmerButtonProps) => {
	return (
		<button
			type="button"
			style={
				{
					"--spread": "90deg",
					"--shimmer-color": "#111236",
					"--speed": "3s",
					"--cut": "0.1em",
					"--bg": "white",
				} as CSSProperties
			}
			className={cn(
				"group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap border border-white/10 px-6 py-3 text-white [background:var(--bg)] dark:text-black",
				"transform-gpu transition-transform duration-300 ease-in-out active:translate-y-[1px]",
				className,
			)}
		>
			<div
				className={cn(
					"-z-30 blur-[2px]",
					"absolute inset-0 overflow-visible [container-type:size]",
				)}
			>
				<div className="animate-slide absolute inset-0 h-[100cqh] [aspect-ratio:1]">
					<div className="animate-spin-around absolute inset-[-100%] w-auto rotate-0 [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
				</div>
			</div>
			{children}
			<div
				className={cn(
					"absolute -z-20 [background:var(--bg)] [inset:var(--cut)]",
				)}
			/>
		</button>
	);
};

export default ShimmerButton;
