import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../config/api";
import type { CategoryDashboard } from "../../types";

/**
 * Hook para buscar o total por Categorias
 */
export const useGetTotalByCategory = () => {
	return useQuery({
		queryKey: ["category-total"],
		queryFn: async (): Promise<CategoryDashboard[]> => {
			const response = await fetch(
				`${BASE_URL}/api/Dashboard/GetTotalByCategory`,
			);
			if (!response.ok)
				throw new Error(`Failed to fetch category: ${response.status}`);
			return await response.json();
		},
		retry: false,
	});
};
