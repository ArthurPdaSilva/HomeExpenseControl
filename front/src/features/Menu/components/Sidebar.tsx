import { Link } from "react-router";
import { baseClass, isActiveClass, useGetMenu } from "../hooks/useGetMenu";
import { useMenu } from "../stores/MenuStore";
import { UserPerfil } from "./UserPerfil";

/**
 * Componente responsável pelo menu lateral
 * Contendo o nome da Plataforma, links e um icon de usuário
 */
export const Sidebar = () => {
	const { isOpen } = useMenu((state) => state);
	const { menu, isActive } = useGetMenu();

	return (
		<aside
			className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-200 flex flex-col gap-5 shrink-0
				justify-between
        transition-transform duration-300 ease-in-out
        md:static md:translate-x-0 md:w-64 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
		>
			<div>
				<div className="p-4 border-b border-gray-200">
					<div className="flex items-center">
						<img src="/icon.png" alt="Logo" className="h-8 w-auto" />
						<span className="ml-2 text-xl font-semibold text-gray-800">
							DespesaFácil
						</span>
					</div>
				</div>

				<nav className="flex flex-col gap-2 p-2 mt-2">
					{menu.map(({ title, link, Icon }) => {
						return (
							<Link
								key={`${title}-${link}`}
								to={link}
								className={isActive(link) ? isActiveClass : baseClass}
							>
								{Icon}
								{title}
							</Link>
						);
					})}
				</nav>
			</div>

			<UserPerfil />
		</aside>
	);
};
