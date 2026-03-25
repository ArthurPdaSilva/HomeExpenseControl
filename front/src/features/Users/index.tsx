import { Pencil, Trash2 } from "lucide-react";
import {
	MRT_ActionMenuItem,
	type MRT_ColumnDef,
	type MRT_Row,
	type MRT_TableInstance,
} from "material-react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { DeleteModal } from "../../components/DeleteModal";
import { ListTemplate } from "../../Templates/ListTemplate";
import { useDeleteUser, useGetUsers } from "./services";
import type { User } from "./types";

/**
 * Componente da Página de Usuários
 * Contendo as informações de usuários
 */
export const Users = () => {
	const { data, isFetching } = useGetUsers();
	const [deleteOpen, setDeleteOpen] = useState(false);
	const [deleteId, setDeleteId] = useState<string | null>(null);
	const { mutate: handleDelete, isPending } = useDeleteUser();
	const navigate = useNavigate();

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

	// Configuração das ações de Editar e Deletar para cada linha da tabela de Usuários
	const rows = ({
		row,
		table,
		closeMenu,
	}: {
		row: MRT_Row<User>;
		table: MRT_TableInstance<User>;
		closeMenu: () => void;
	}) => [
		<MRT_ActionMenuItem
			icon={<Pencil />}
			key="edit"
			label="Editar"
			onClick={() => navigate(`/edit-user/${row.original.id}`)}
			table={table}
		/>,
		<MRT_ActionMenuItem
			icon={<Trash2 />}
			key="delete"
			label="Deletar"
			onClick={() => {
				setDeleteOpen(true);
				setDeleteId(row.original.id);
				closeMenu();
			}}
			table={table}
		/>,
	];

	const handleDeleteConfirm = () => {
		if (!deleteId) return;
		handleDelete(deleteId, {
			onSuccess: () => {
				setDeleteOpen(false);
				setDeleteId(null);
			},
			onError: (error) => {
				console.error("Failed to delete user:", error);
			},
		});
	};

	return (
		<>
			<DeleteModal
				open={deleteOpen}
				handleDeny={() => setDeleteOpen(false)}
				handleConfirm={handleDeleteConfirm}
			/>
			<ListTemplate<User>
				columns={columns}
				data={data || []}
				title="Usuários"
				handleAdd={() => navigate("/add-user")}
				isFetching={isFetching || isPending}
				// Row Actions são as ações de Editar e Deletar, que ficam disponíveis ao clicar no ícone de "três pontinhos" no final de cada linha da tabela. Optei por colocar essas ações aqui no template mesmo, já que a maioria das páginas de listagem vão ter ações semelhantes, e isso evita repetição de código.
				renderRowActionMenuItems={rows}
			/>
		</>
	);
};
