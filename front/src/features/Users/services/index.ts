import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/api";
import { queryClient } from "../../../config/queryClient";
import type { UserValidation } from "../Add/schema";
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
			// Invalido a querie de usuários para que ela seja refetchada e mostre os dados atualizados após a deleção
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};

/**
 * Hook para criar um usuário na API
 */
export const useCreateUser = () => {
	return useMutation({
		mutationFn: async (data: UserValidation) => {
			const response = await fetch(`${BASE_URL}/api/User`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok)
				throw new Error(`Failed to create user: ${response.status}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
