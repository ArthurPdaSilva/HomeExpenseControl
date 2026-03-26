import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ListTemplate } from "../../Templates/ListTemplate";
import { useGetCategories } from "./services";
import { type Category, getPurposeLabel } from "./types";

/**
 * Componente da Página de Categorias
 * Contendo as informações de categorias
 */
export const Categories = () => {
	const { data, isFetching } = useGetCategories();
	const navigate = useNavigate();

	// Configuração das colunas da tabela de Categorias
	const columns = useMemo<MRT_ColumnDef<Category>[]>(
		() => [
			{
				accessorKey: "description",
				header: "Descrição",
			},
			{
				accessorKey: "purpose",
				header: "Finalidade",
				Cell: ({ cell }) => {
					const value = cell.getValue() as Category["purpose"];
					return getPurposeLabel(value);
				},
			},
			{
				accessorKey: "createdAt",
				header: "Criado em",
				Cell: ({ cell }) => {
					const v = cell.getValue() as Category["createdAt"];
					return v ? new Date(v).toLocaleString() : "-";
				},
			},
		],
		[],
	);

	return (
		<ListTemplate<Category>
			columns={columns}
			data={data || []}
			handleAdd={() => navigate("add-category")}
			title="Categorias"
			isFetching={isFetching}
		/>
	);
};
