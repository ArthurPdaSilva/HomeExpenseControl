import { useMenu } from "../stores/MenuStore";

/**
 * Componente responsável pelo Menu Mobile
 */
export const MobileMenu = () => {
	// Utilizando o hook do zustand para controlar o estado do menu
	const { toggleMenu } = useMenu((state) => state);

	return (
		<header className="md:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sticky top-0 z-30">
			<div className="flex items-center gap-2">
				<img src="/icon.png" alt="Logo" className="w-8 h-8" />
				<span className="ml-2 text-xl font-semibold text-gray-800">
					DespesaFácil
				</span>
			</div>

			<button
				type="button"
				onClick={toggleMenu}
				className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
				aria-label="Toggle Menu"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6"
				>
					<title>Hamburguer</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</header>
	);
};
