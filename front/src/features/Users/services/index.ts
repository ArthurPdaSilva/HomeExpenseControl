import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../App";
import { BASE_URL } from "../../../config/api";
import type { User } from "../types";

/**
 * Hook para buscar os usuários da API
 * Optei pelo tanstack query para facilitar o gerenciamento e o cache dos dados
 */
export const useGetUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: async (): Promise<User[]> => {
			const response = await fetch(`${BASE_URL}/api/User`);
			return await response.json();
		},
		retry: false,
	});
};

/**
 * Hook para apagar um usuário da API pelo ID
 */
export const useDeleteUser = () => {
	return useMutation({
		mutationFn: async (id: string) => {
			const response = await fetch(`${BASE_URL}/api/User/${id}`, {
				method: "DELETE",
			});
			if (!response.ok)
				throw new Error(`Failed to delete user: ${response.status}`);
		},
		onSuccess: () => {
			// Invalida a query de usuários para refetch automático após a deleção
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
