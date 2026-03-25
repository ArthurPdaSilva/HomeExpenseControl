import { MobileMenu } from "./MobileMenu";
import { Sidebar } from "./Sidebar";

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
