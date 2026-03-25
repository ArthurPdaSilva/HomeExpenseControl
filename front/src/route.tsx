import { Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { PageTemplate } from "./Templates/PageTemplate";

/**
 * Função responsável pelo gerenciamento de rotas
 * Páginas: Home, Categories e Transactions
 */
export const RouteRoot = () => {
	return (
		<Routes>
			<Route element={<PageTemplate />}>
				<Route index element={<Home />} />
			</Route>
		</Routes>
	);
};
