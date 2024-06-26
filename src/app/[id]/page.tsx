import { Counter } from "@/components/counter";
import { CounterStoreProvider } from "@/components/provider";

type Props = {
	params: {
		id: string;
	};
};

export default function ({ params }: Props) {
	return (
		<CounterStoreProvider count={Number(params.id)}>
			<Counter />
		</CounterStoreProvider>
	);
}
