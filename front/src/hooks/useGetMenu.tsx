import { ArrowLeftRight, LayoutGrid, Users } from "lucide-react";
import type { JSX } from "react";
import { useLocation } from "react-router";

// Variações de estilo do menu para ele ter uma cor diferente quanto está ou não está ativo
export const isActiveClass =
	"group flex items-center px-2 py-2 gap-2 text-base font-medium rounded-md bg-indigo-100 text-indigo-700";

export const baseClass =
	"group flex items-center px-2 py-2 gap-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900";

// Title e Link são constantes ao invés de string para facilitar o autocomplete e aumentar a segurança na tipagem
type MenuProps = {
	title: "Usuários" | "Categorias" | "Transações";
	link: "/" | "/category" | "/transaction";
	Icon: JSX.Element;
};

const menu: MenuProps[] = [
	{ title: "Usuários", link: "/", Icon: <Users /> },
	{ title: "Categorias", link: "/category", Icon: <LayoutGrid /> },
	{ title: "Transações", link: "/transaction", Icon: <ArrowLeftRight /> },
];

/**
 * Hook que retornar o menu e se o link atual está ativo
 * menu
 */
export const useGetMenu = () => {
	const { pathname } = useLocation();

	const isActive = (link: string) => link === pathname;

	return {
		menu,
		isActive,
	};
};
