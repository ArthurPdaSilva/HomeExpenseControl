import type { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { useNavigate } from "react-router";
import { ValueField } from "../../components/ValueField";
import { ListTemplate } from "../../Templates/ListTemplate";
import { useGetTransactions } from "./services";
import { getTransactionTypeLabel, type Transaction } from "./types";

/**
 * Componente da Página de Transações
 * Contendo as informações de transações
 */
export const Transactions = () => {
	const { data, isFetching } = useGetTransactions();
	const navigate = useNavigate();

	// Configuração das colunas da tabela de Transações
	const columns = useMemo<MRT_ColumnDef<Transaction>[]>(
		() => [
			{
				accessorKey: "description",
				header: "Descrição",
			},
			{
				accessorKey: "value",
				header: "Valor",
				Cell: ({ cell }) => {
					return <ValueField value={cell.getValue() as number} />;
				},
			},
			{
				accessorKey: "type",
				header: "Tipo",
				Cell: ({ cell }) => {
					const value = cell.getValue() as Transaction["type"];
					return getTransactionTypeLabel(value);
				},
			},
			{
				accessorKey: "categoryDescription",
				header: "Categoria",
			},
			{
				accessorKey: "userName",
				header: "Pessoa",
			},
		],
		[],
	);

	return (
		<ListTemplate<Transaction>
			columns={columns}
			data={data || []}
			title="Transações"
			isFetching={isFetching}
			handleAdd={() => navigate("add-transaction")}
		/>
	);
};
