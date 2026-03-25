import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../config/api";
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
