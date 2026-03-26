import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/api";
import { queryClient } from "../../../config/queryClient";
import type { UserValidation } from "../schema";
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
 * Hook para buscar um usuário específico da API pelo ID
 */
export const useGetUser = (id?: string) => {
	return useQuery({
		queryKey: ["user", id],
		queryFn: async (): Promise<User> => {
			const response = await fetch(`${BASE_URL}/api/User/${id}`);
			if (!response.ok)
				throw new Error(`Failed to fetch user: ${response.status}`);
			return await response.json();
		},
		// A query só é habilitada se o ID for fornecido, evitando chamadas desnecessárias para a API
		enabled: !!id,
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

/**
 * Hook para atualizar um usuário na API
 */
export const useUpdateUser = () => {
	return useMutation({
		mutationFn: async (data: UserValidation) => {
			const response = await fetch(`${BASE_URL}/api/User/${data.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(data),
			});
			if (!response.ok)
				throw new Error(`Failed to update user: ${response.status}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
