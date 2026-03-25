import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { queryClient } from "./config/queryClient";
import { RouteRoot } from "./route";

export const App = () => {
	return (
		<QueryClientProvider client={queryClient}>
			{/* Devtools é uma ferramenta que consigo monitorar as ferramentas do Tanstack, no caso eu só quero monitorar as requisições feitas pelo tanstack query */}
			<TanStackDevtools
				plugins={[
					{
						name: "Tanstack Query Devtools",
						render: <ReactQueryDevtoolsPanel />,
					},
				]}
			/>
			<RouteRoot />
		</QueryClientProvider>
	);
};
