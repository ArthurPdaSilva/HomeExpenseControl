import { Route, Routes } from "react-router";
import { Categories } from "./features/Categories/index.tsx";
import { Transactions } from "./features/Transactions/index.tsx";
import { Users } from "./features/Users/index.tsx";
import { PageTemplate } from "./Templates/PageTemplate";

/**
 * Função responsável pelo gerenciamento de rotas
 * Páginas: Home, Categories e Transactions
 */
export const RouteRoot = () => {
	return (
		<Routes>
			<Route element={<PageTemplate children={undefined} />}>
				<Route index element={<Users />} />
				<Route path="/categories" element={<Categories />} />
				<Route path="/transactions" element={<Transactions />} />
			</Route>
		</Routes>
	);
};
