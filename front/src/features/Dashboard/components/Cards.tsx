import { useMemo } from "react";
import { decimalToReal } from "../../../utils/decimalToReal";
import type { GeneralDashboard } from "../types";

type CardsProps = {
	data: GeneralDashboard[];
};

/**
 * Cards de Totais
 * Recebe os dados de totais (por usuário ou por categoria) e calcula os totais gerais para exibir nos cards
 * Tanto o total por Category quanto o total por User possuem esse componente
 */
export const Cards = ({ data }: CardsProps) => {
	const totals = useMemo(() => {
		const totalIncome = (data || []).reduce(
			(s, d) => s + (d.totalIncome || 0),
			0,
		);
		const totalExpense = (data || []).reduce(
			(s, d) => s + (d.totalExpense || 0),
			0,
		);
		const balance = totalIncome - totalExpense;
		return { totalIncome, totalExpense, balance };
	}, [data]);

	return (
		<div className="flex justify-end gap-8 text-lg font-semibold">
			{/* Cada coluna será um card */}
			<div className="bg-green-700 px-4 py-2 rounded text-white">
				Total de Receitas: {decimalToReal(totals.totalIncome)}
			</div>
			<div className="bg-red-700 px-4 py-2 rounded text-white">
				Total de Despesas: {decimalToReal(totals.totalExpense)}
			</div>
			<div className="bg-blue-700 px-4 py-2 rounded text-white">
				Saldo Líquido: {decimalToReal(totals.balance)}
			</div>
		</div>
	);
};
