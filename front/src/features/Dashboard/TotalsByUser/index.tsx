import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { ValueField } from "../../../components/ValueField";
import { ListTemplate } from "../../../Templates/ListTemplate";
import { Cards } from "../components/Cards";
import type { UserDashboard } from "../types";
import { useGetTotalByUser } from "./services";

/**
 * Página de Totais por Usuário
 */
export const TotalsByUser = () => {
	const { data, isFetching } = useGetTotalByUser();

	const columns = useMemo<MRT_ColumnDef<UserDashboard>[]>(
		() => [
			{
				accessorKey: "userName",
				header: "Nome do Usuário",
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
		],
		[],
	);

	return (
		<div className="flex flex-1 flex-col">
			<ListTemplate<UserDashboard>
				columns={columns}
				data={data || []}
				isFetching={isFetching}
				title="Totais por Usuário"
			>
				<Cards data={data || []} />
			</ListTemplate>
		</div>
	);
};
