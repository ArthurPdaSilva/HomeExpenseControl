import { Menu } from "../components/Menu";

/**
 * Componente responsável por conter as configurações default das Páginas (Template)
 * O template conterá o default container e o Menu
 */
export const PageTemplate = () => {
	return (
		<main className="h-full flex flex-col md:flex-row">
			<Menu />
			<div className="bg-gray-200 h-screen flex flex-col flex-1 gap-5">
				Home
			</div>
		</main>
	);
};
