import { useMutation, useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/api";
import { queryClient } from "../../../config/queryClient";
import type { CategoryValidation } from "../Add/schema";
import type { Category } from "../types";

/**
 * Hook para buscar as categorias da API
 */
export const useGetCategories = () => {
	return useQuery({
		queryKey: ["categories"],
		queryFn: async (): Promise<Category[]> => {
			const response = await fetch(`${BASE_URL}/api/Category`);
			if (!response.ok)
				throw new Error(`Failed to fetch categories: ${response.status}`);
			return (await response.json()) as Category[];
		},
		retry: false,
	});
};

/**
 * Hook para criar uma categoria na API
 */
export const useCreateCategory = () => {
	return useMutation({
		mutationFn: async (data: CategoryValidation) => {
			const response = await fetch(`${BASE_URL}/api/Category`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});
			if (!response.ok)
				throw new Error(`Failed to create category: ${response.status}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});
};
