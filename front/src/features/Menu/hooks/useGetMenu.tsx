import {
	ArrowLeftRight,
	LayoutGrid,
	PieChart,
	UserCheck,
	Users,
} from "lucide-react";
import type { JSX } from "react";
import { useLocation } from "react-router";

// Variações de estilo do menu para ele ter uma cor diferente quanto está ou não está ativo
export const isActiveClass =
	"group flex items-center px-2 py-2 gap-2 text-base font-medium rounded-md bg-[#81D4FA] text-white";

export const baseClass =
	"group flex items-center px-2 py-2 gap-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900";

// Title e Link são constantes ao invés de string para facilitar o autocomplete e aumentar a segurança na tipagem
type MenuProps = {
	title:
		| "Usuários"
		| "Categorias"
		| "Transações"
		| "Totais por Usuário"
		| "Totais por Categoria";
	link:
		| "/"
		| "/categories"
		| "/transactions"
		| "/dashboard/totals-by-user"
		| "/dashboard/totals-by-category";
	Icon: JSX.Element;
};

const menu: MenuProps[] = [
	{ title: "Usuários", link: "/", Icon: <Users /> },
	{ title: "Categorias", link: "/categories", Icon: <LayoutGrid /> },
	{ title: "Transações", link: "/transactions", Icon: <ArrowLeftRight /> },
	{
		title: "Totais por Usuário",
		link: "/dashboard/totals-by-user",
		Icon: <UserCheck />,
	},
	{
		title: "Totais por Categoria",
		link: "/dashboard/totals-by-category",
		Icon: <PieChart />,
	},
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
