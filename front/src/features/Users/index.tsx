import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { ListTemplate } from "../../Templates/ListTemplate";
import { useGetUsers } from "./services";
import type { User } from "./types";

/**
 * Componente da Página de Usuários
 * Contendo as informações de usuários
 */
export const Users = () => {
	const { data, isFetching } = useGetUsers();

	// Configuração das colunas da tabela de Usuários
	const columns = useMemo<MRT_ColumnDef<User>[]>(
		() => [
			{
				accessorKey: "name",
				header: "Nome",
			},
			{
				accessorKey: "age",
				header: "Idade",
			},
		],
		[],
	);

	return (
		<ListTemplate<User>
			columns={columns}
			data={data || []}
			title="Usuários"
			isFetching={isFetching}
		/>
	);
};
