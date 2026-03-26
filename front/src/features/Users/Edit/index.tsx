// import { useCreateCustomer } from "@/features/Customers/services";
import { useNavigate, useParams } from "react-router";
import { CustomAlert } from "../../../components/CustomAlert";
import type { UserValidation } from "../schema";
import { useGetUser, useUpdateUser } from "../services";
import { UserFormTemplate } from "../templates/UserFormTemplate";

/**
 * Componente da Página de Edição de Usuário
 * Contendo as informações de usuários mais o ID
 */
export const EditUser = () => {
	// Pegar o guid do usuário da URL
	const { id } = useParams<{ id: string }>();
	const { data: user, isFetching } = useGetUser(id);
	const { mutate: updateUser, isPending } = useUpdateUser();
	const navigate = useNavigate();

	if (!id) {
		navigate("/");
		return null;
	}

	// Validações extras, só para garantir que um usuário que não existe ou foi apagado não seja possível editar
	if (!user && !isFetching) {
		CustomAlert.error("Usuário não encontrado.");
		navigate("/");
		return null;
	}

	const onSubmit = (data: UserValidation) => {
		updateUser(data, {
			onSuccess: () => {
				// To voltando para a home depois de salvar igual a adição
				navigate("/");
				CustomAlert.success("Usuário editado com sucesso!");
			},
			onError: (error) => {
				console.error("Failed to update user:", error);
				CustomAlert.error("Falha ao editar usuário. Tente novamente.");
			},
		});
	};

	return (
		<UserFormTemplate
			onSubmit={onSubmit}
			user={{
				id: id,
				name: user?.name || "",
				age: user?.age || 0,
			}}
			isPending={isPending}
			title="Editar Usuário"
		/>
	);
};
