// import { useCreateCustomer } from "@/features/Customers/services";
import { useNavigate } from "react-router";
import { CustomAlert } from "../../../components/CustomAlert";
import type { UserValidation } from "../schema";
import { useCreateUser } from "../services";
import { UserFormTemplate } from "../templates/UserFormTemplate";

/**
 * Componente da Página de Adição de Usuário
 * Contendo as informações de usuários
 */
export const AddUser = () => {
	const { mutate: createUser, isPending } = useCreateUser();
	const navigate = useNavigate();

	const onSubmit = (data: UserValidation) => {
		createUser(data, {
			onSuccess: () => {
				// To voltando para a home depois de salvar
				navigate("/");
				CustomAlert.success("Usuário criado com sucesso!");
			},
			onError: (error) => {
				console.error("Failed to create user:", error);
				CustomAlert.error("Falha ao criar usuário. Tente novamente.");
			},
		});
	};

	return (
		<UserFormTemplate
			onSubmit={onSubmit}
			isPending={isPending}
			title="Adicionar Usuário"
		/>
	);
};
