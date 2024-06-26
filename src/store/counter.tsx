import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";

export type CounterState = {
	count: number;
};

export type CounterActions = {
	decrementCount: () => void;
	incrementCount: () => void;
};

export type CounterStore = CounterState & CounterActions;

export const createCounterStore = (initState: CounterState) => {
	return createStore<CounterStore>()(
		persist(
			(set) => ({
				count: initState.count,
				decrementCount: () => set((state) => ({ count: state.count - 1 })),
				incrementCount: () => set((state) => ({ count: state.count + 1 })),
			}),
			{
				name: `count-page-${initState.count}`,
				storage: createJSONStorage(() => localStorage),
			},
		),
	);
};
