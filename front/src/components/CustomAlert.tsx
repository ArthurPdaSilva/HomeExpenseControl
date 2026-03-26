import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CustomAlert = {
	success: (msg: string) => toast.success(msg),
	error: (msg: string) => toast.error(msg),
	info: (msg: string, duration?: number | false) =>
		toast.info(msg, { autoClose: duration }),
	warning: (msg: string) => toast.warning(msg),
	dismiss: () => toast.dismiss(),
};

/**
 * Componente para fornecer o container do react-toastify, que é necessário para exibir os toasts de alerta
 * Estou Encapsulando junto com o CustomAlert para facilitar a importação e também caso eu queira mudar a lib de alertas no futuro, eu só precise mudar aqui
 */
export const CustomAlertProvider = () => (
	<ToastContainer
		position="top-right"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick={true}
		rtl={false}
		pauseOnFocusLoss
		pauseOnHover
		theme="light"
		transition={Bounce}
	/>
);
