import { useState } from "react";
import useCartStore from "@/store/CartStore";
import { toast } from "sonner";
import { MinusIcon, XIcon } from "lucide-react";

export default function QuantityButton({
	quantity,
	cartItemId,
}: { quantity: number; cartItemId: string }) {
	const [isInput, setIsInput] = useState(false);
	const [value, setValue] = useState(quantity.toString());
	const { updateQuantity } = useCartStore();

	const handleIncrement = async () => {
		const toastId = toast.loading("Updating quantity...");
		try {
			await updateQuantity(cartItemId, quantity + 1);
			toast.success("Quantity updated successfully", { id: toastId });
		} catch (err) {
			setValue(quantity.toString());
			toast.error("An unexpected error occurred", { id: toastId });
			console.log(err);
		}
	};

	const handleDecrement = async () => {
		if (quantity > 1) {
			const toastId = toast.loading("Updating quantity...");
			try {
				await updateQuantity(cartItemId, quantity - 1);
				toast.success("Quantity updated successfully", { id: toastId });
			} catch (err) {
				toast.error("An unexpected error occurred", { id: toastId });
				console.log(err);
			}
		} else {
			//We could alsso just call the delete function here, Same thing!
			toast.error("Cannot reduce quantity below 1");
		}
	};

	return (
		<div className="flex h-full w-full gap-1">
			<button
				type="button"
				className={`icon ${quantity === 5 ? "active:bg-neutral-100 active:text-neutral-200" : ""}`}
				onClick={handleIncrement}
			>
				<XIcon className="h-7 w-7 bg-gray-100 p-1 rounded-full" />
			</button>
			<button
				className="font-semibold text-lg"
				onClick={() => setIsInput(true)}
				type="button"
			>
				{quantity}
			</button>
			<button
				type="button"
				className="icon"
				disabled={quantity === 1}
				onClick={handleDecrement}
			>
				<MinusIcon className="h-7 w-7 bg-gray-100 p-1 rounded-full" />
			</button>
		</div>
	);
}
