import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/api";
import type { Transaction } from "../types";

/**
 * Hook para buscar as transações da API
 * Optei pelo tanstack query para facilitar o gerenciamento e o cache dos dados
 */
export const useGetTransactions = () => {
	return useQuery({
		queryKey: ["transactions"],
		queryFn: async (): Promise<Transaction[]> => {
			const response = await fetch(`${BASE_URL}/api/Transaction`);
			return await response.json();
		},
		retry: false,
	});
};
