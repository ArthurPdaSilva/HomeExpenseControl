import { MobileMenu } from "./components/MobileMenu";
import { Sidebar } from "./components/Sidebar";

/**
 * Componente de Menu
 * Conterá o menu mobile e a sidebar em telas maiores
 */
export const Menu = () => {
	return (
		<>
			<MobileMenu />
			<Sidebar />
		</>
	);
};
