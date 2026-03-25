import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { useGetUsers } from "./services";
import type { User } from "./types";

/**
 * Componente da Página de Usuários
 * Contendo as informações de usuários
 */
export const Users = () => {
	const { data, isFetching } = useGetUsers();

	// Configuração das colundas da tabela de Usuários
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
		<div className="flex flex-col flex-1 gap-5">
			<h1 className="text-4xl font-semibold">Usuários</h1>
			{/* Tabela do material react table*/}
			<MaterialReactTable
				data={data || []}
				columns={columns}
				muiTableContainerProps={{
					sx: { height: "450px" },
				}}
				state={{ isLoading: isFetching }}
			/>
		</div>
	);
};
