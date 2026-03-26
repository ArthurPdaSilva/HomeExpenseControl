import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/api";
import { queryClient } from "../../../config/queryClient";
import type { TransactionValidation } from "../Add/schema";
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

/**
 * Hook para criar uma transação na API
 */
export const useCreateTransaction = () => {
	return useMutation({
		mutationFn: async (data: TransactionValidation) => {
			const response = await fetch(`${BASE_URL}/api/Transaction`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok)
				throw new Error(`Failed to create transaction: ${response.status}`);
		},
		onSuccess: () => {
			// Invalido a querie de transações para que ela seja refetchada e mostre os dados atualizados após a criação
			queryClient.invalidateQueries({ queryKey: ["transactions"] });
			queryClient.invalidateQueries({ queryKey: ["user-total"] });
		},
	});
};
