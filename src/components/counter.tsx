"use client";
import { useCounterStore } from "./provider";

export const Counter = () => {
	const { count, incrementCount } = useCounterStore((store) => store);

	return (
		<div>
			<h1>{count}</h1>
			<button onClick={incrementCount} type="button">
				Increment
			</button>
		</div>
	);
};
