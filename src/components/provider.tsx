"use client";

import { type ReactNode, createContext, useContext, useRef } from "react";
import { useStore } from "zustand";

import { type CounterStore, createCounterStore } from "@/store/counter";

export type CounterStoreApi = ReturnType<typeof createCounterStore>;

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(
	undefined,
);

export interface CounterStoreProviderProps {
	count: number;
	children: ReactNode;
}

export const CounterStoreProvider = ({
	count,
	children,
}: CounterStoreProviderProps) => {
	const storeRef = useRef<CounterStoreApi>();
	if (!storeRef.current) {
		storeRef.current = createCounterStore({ count });
	}

	return (
		<CounterStoreContext.Provider value={storeRef.current}>
			{children}
		</CounterStoreContext.Provider>
	);
};

export const useCounterStore = <T,>(
	selector: (store: CounterStore) => T,
): T => {
	const counterStoreContext = useContext(CounterStoreContext);

	if (!counterStoreContext) {
		throw new Error("useCounterStore must be used within CounterStoreProvider");
	}

	return useStore(counterStoreContext, selector);
};
