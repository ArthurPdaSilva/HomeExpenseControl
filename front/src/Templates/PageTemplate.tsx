import { Outlet } from "react-router";
import { Menu } from "../features/Menu";
/**
 * Componente responsável por conter as configurações default das Páginas (Template)
 * O template conterá o default container e o Menu
 */

export const PageTemplate = () => {
	return (
		<main className="h-full flex flex-col md:flex-row">
			<Menu />
			<div className="bg-gray-200 h-screen flex flex-col flex-1 gap-5 p-4 ">
				{/* Outlet é como se fosse um children, no caso para as rotas filhas */}
				<Outlet />
			</div>
		</main>
	);
};
