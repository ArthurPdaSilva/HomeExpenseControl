import { Route, Routes } from "react-router";
import { Categories } from "./features/Categories/index.tsx";
import { Transactions } from "./features/Transactions/index.tsx";
import { AddUser } from "./features/Users/Add/index.tsx";
import { EditUser } from "./features/Users/Edit/index.tsx";
import { Users } from "./features/Users/index.tsx";
import { PageTemplate } from "./Templates/PageTemplate";

/**
 * RouteRoot é o componente responsável por definir as rotas da aplicação.
 * Páginas: Users, Categories e Transactions
 */
export const RouteRoot = () => {
	return (
		<Routes>
			<Route element={<PageTemplate />}>
				<Route path="/">
					<Route index element={<Users />} />
					<Route path="add-user" element={<AddUser />} />
					<Route path="edit-user/:id" element={<EditUser />} />
				</Route>
				<Route path="categories">
					<Route index element={<Categories />} />
					<Route path=":id" element={<Categories />} />
					<Route path="add-categories" element={<Categories />} />
				</Route>
				<Route path="transactions">
					<Route index element={<Transactions />} />
					<Route path=":id" element={<Transactions />} />
					<Route path="add-transactions" element={<Transactions />} />
				</Route>
			</Route>
		</Routes>
	);
};
