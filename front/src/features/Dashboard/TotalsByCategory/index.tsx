import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { ValueField } from "../../../components/ValueField";
import { ListTemplate } from "../../../Templates/ListTemplate";
import { Cards } from "../components/Cards";
import type { CategoryDashboard } from "../types";
import { useGetTotalByCategory } from "./services";

/**
 * Página de Totais por Categoria
 */
export const TotalsByCategory = () => {
	const { data, isFetching } = useGetTotalByCategory();

	const columns = useMemo<MRT_ColumnDef<CategoryDashboard>[]>(
		() => [
			{
				accessorKey: "categoryDescription",
				header: "Descrição da Categoria",
			},
			{
				accessorKey: "totalIncome",
				header: "Total de Receitas",
				Cell: ({ cell }) => <ValueField value={cell.getValue() as number} />,
			},
			{
				accessorKey: "totalExpense",
				header: "Total de Despesas",
				Cell: ({ cell }) => <ValueField value={cell.getValue() as number} />,
			},
			{
				accessorKey: "balance",
				header: "Saldo",
				Cell: ({ cell }) => <ValueField value={cell.getValue() as number} />,
			},
			{
				accessorKey: "createdAt",
				header: "Criado em",
				Cell: ({ cell }) => {
					const v = cell.getValue() as CategoryDashboard["createdAt"];
					return v ? new Date(v).toLocaleString() : "-";
				},
			},
		],
		[],
	);

	return (
		<div className="flex flex-1 flex-col">
			<ListTemplate<CategoryDashboard>
				columns={columns}
				data={data || []}
				isFetching={isFetching}
				title="Totais por Categoria"
			>
				<Cards data={data || []} />
			</ListTemplate>
		</div>
	);
};
