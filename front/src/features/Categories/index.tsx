import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { ListTemplate } from "../../Templates/ListTemplate";
import { useGetCategories } from "./services";
import { type Category, getPurposeLabel } from "./types";

/**
 * Componente da Página de Categorias
 * Contendo as informações de categorias
 */
export const Categories = () => {
	const { data, isFetching } = useGetCategories();

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
					const value = cell.getValue() as Category["Purpose"];
					return getPurposeLabel(value);
				},
			},
		],
		[],
	);

	return (
		<ListTemplate<Category>
			columns={columns}
			data={data || []}
			title="Categorias"
			isFetching={isFetching}
		/>
	);
};
