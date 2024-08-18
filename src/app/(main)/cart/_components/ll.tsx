"use client";

import { useEffect, useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";
import clsx from "clsx";
import useCartStore from "@/store/CartStore";
import { toast } from "sonner";

interface StepperProps {
	quantity: number;
	cartItemId: string;
}

export default function Stepper({
	quantity: initialQuantity,
	cartItemId,
}: StepperProps) {
	const [count, setCount] = useState(initialQuantity);
	const [prevCount, setPrevCount] = useState(initialQuantity);
	const { updateQuantity } = useCartStore();

	const prevCountRef = useRef<HTMLElement>(null);
	const nextCountRef = useRef<HTMLElement>(null);
	const prevCountTens = useRef<HTMLElement>(null);
	const nextCountTens = useRef<HTMLElement>(null);
	const prevCountHunds = useRef<HTMLElement>(null);
	const nextCountHunds = useRef<HTMLElement>(null);

	const add = async () => {
		if (count < 999) {
			const toastId = toast.loading("Updating quantity...");
			try {
				await updateQuantity(cartItemId, count + 1);
				setPrevCount(count);
				setCount((prevCount) => prevCount + 1);
				toast.success("Quantity updated successfully", { id: toastId });
			} catch (err) {
				toast.error("An unexpected error occurred", { id: toastId });
				console.log(err);
			}
		}
	};

	const subtract = async () => {
		if (count > 1) {
			const toastId = toast.loading("Updating quantity...");
			try {
				await updateQuantity(cartItemId, count - 1);
				setPrevCount(count);
				setCount((prevCount) => prevCount - 1);
				toast.success("Quantity updated successfully", { id: toastId });
			} catch (err) {
				toast.error("An unexpected error occurred", { id: toastId });
				console.log(err);
			}
		} else {
			toast.error("Cannot reduce quantity below 1");
		}
	};

	useEffect(() => {
		const prev = prevCountRef.current;
		const next = nextCountRef.current;
		const prevTens = prevCountTens.current;
		const nextTens = nextCountTens.current;
		const prevHunds = prevCountHunds.current;
		const nextHunds = nextCountHunds.current;

		if (prev && next) {
			if (count > prevCount) {
				prev.classList.add("slide-out-up");
				next.classList.add("slide-in-up");
			} else {
				prev.classList.add("slide-out-down");
				next.classList.add("slide-in-down");
			}

			const handleAnimationEnd = () => {
				prev.classList.remove("slide-out-up", "slide-out-down");
				next.classList.remove("slide-in-up", "slide-in-down");
				prev.removeEventListener("animationend", handleAnimationEnd);
			};

			prev.addEventListener("animationend", handleAnimationEnd);
		}

		if (
			prevTens &&
			nextTens &&
			Math.floor(count / 10) !== Math.floor(prevCount / 10)
		) {
			if (Math.floor(count / 10) > Math.floor(prevCount / 10)) {
				prevTens.classList.add("slide-out-up");
				nextTens.classList.add("slide-in-up");
			} else if (Math.floor(count / 10) < Math.floor(prevCount / 10)) {
				prevTens.classList.add("slide-out-down");
				nextTens.classList.add("slide-in-down");
			}

			const handleAnimationEndTens = () => {
				prevTens.classList.remove("slide-out-up", "slide-out-down");
				nextTens.classList.remove("slide-in-up", "slide-in-down");
				prevTens.removeEventListener("animationend", handleAnimationEndTens);
			};

			prevTens.addEventListener("animationend", handleAnimationEndTens);
		}

		if (
			prevHunds &&
			nextHunds &&
			Math.floor(count / 100) !== Math.floor(prevCount / 100)
		) {
			if (Math.floor(count / 100) > Math.floor(prevCount / 100)) {
				prevHunds.classList.add("slide-out-up");
				nextHunds.classList.add("slide-in-up");
			} else if (Math.floor(count / 100) < Math.floor(prevCount / 100)) {
				prevHunds.classList.add("slide-out-down");
				nextHunds.classList.add("slide-in-down");
			}

			const handleAnimationEndHunds = () => {
				prevHunds.classList.remove("slide-out-up", "slide-out-down");
				nextHunds.classList.remove("slide-in-up", "slide-in-down");
				prevHunds.removeEventListener("animationend", handleAnimationEndHunds);
			};

			prevHunds.addEventListener("animationend", handleAnimationEndHunds);
		}
	}, [count, prevCount]);

	return (
		<>
			<div className="flex items-center gap-x-2.5 overflow-hidden rounded-full border border-neutral-300 bg-neutral-200/50 px-1 dark:border-neutral-700 dark:bg-neutral-800">
				<button
					className="rounded-full bg-neutral-300 p-1.5 transition-colors hover:bg-neutral-400/50 active:bg-neutral-400/60 disabled:cursor-not-allowed disabled:bg-neutral-300/50 disabled:text-neutral-400 disabled:hover:bg-neutral-300/50 disabled:active:bg-neutral-300/25 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-500/50 dark:active:bg-neutral-500/30 dark:disabled:bg-neutral-700/25 dark:disabled:text-neutral-600 dark:disabled:hover:bg-neutral-700/25 dark:disabled:active:bg-neutral-700/25"
					onClick={subtract}
					type="button"
					disabled={count === 1}
				>
					<Minus />
				</button>
				<div
					className={clsx(
						"flex h-[34px] items-center justify-center gap-x-[0.5px] overflow-hidden transition-all",
					)}
					style={{ width: count > 9 ? (count > 99 ? 30 : 20) : 10 }}
				>
					<div
						className={clsx(
							"pointer-events-none relative h-[34px] w-2.5 flex-col items-center justify-center overflow-hidden",
							count > 99 ? "flex" : "hidden",
						)}
					>
						<span
							className="absolute w-full text-center transition-transform duration-300"
							ref={prevCountHunds}
							style={{ transform: "translateY(-100%)" }}
						>
							{Math.floor(prevCount / 100)}
						</span>
						<span
							className="absolute w-full text-center transition-transform duration-300"
							ref={nextCountHunds}
							style={{ transform: "translateY(0%)" }}
						>
							{Math.floor(count / 100)}
						</span>
					</div>
					<div
						className={clsx(
							"pointer-events-none relative h-[34px] w-2.5 flex-col items-center justify-center overflow-hidden",
							count > 9 ? "flex" : "hidden",
						)}
					>
						<span
							className="absolute w-full text-center transition-transform duration-300"
							ref={prevCountTens}
							style={{ transform: "translateY(-100%)" }}
						>
							{Math.floor(prevCount / 10) % 10}
						</span>
						<span
							className="absolute w-full text-center transition-transform duration-300"
							ref={nextCountTens}
							style={{ transform: "translateY(0%)" }}
						>
							{Math.floor(count / 10) % 10}
						</span>
					</div>
					<div className="pointer-events-none relative flex h-[34px] w-2.5 flex-col items-center justify-center overflow-hidden">
						<span
							className="absolute w-full text-center transition-transform duration-300"
							ref={prevCountRef}
							style={{ transform: "translateY(-100%)" }}
						>
							{prevCount % 10}
						</span>
						<span
							className="absolute w-full text-center transition-transform duration-300"
							ref={nextCountRef}
							style={{ transform: "translateY(0%)" }}
						>
							{count % 10}
						</span>
					</div>
				</div>
				<button
					className="rounded-full bg-neutral-300 p-1.5 transition-colors hover:bg-neutral-400/50 active:bg-neutral-400/60 disabled:cursor-not-allowed disabled:bg-neutral-300/50 disabled:text-neutral-400 disabled:hover:bg-neutral-300/50 disabled:active:bg-neutral-300/25 dark:bg-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-500/50 dark:active:bg-neutral-500/30 dark:disabled:bg-neutral-700/25 dark:disabled:text-neutral-600 dark:disabled:hover:bg-neutral-700/25 dark:disabled:active:bg-neutral-700/25"
					onClick={add}
					type="button"
					disabled={count === 999}
				>
					<Plus />
				</button>
			</div>
		</>
	);
}
