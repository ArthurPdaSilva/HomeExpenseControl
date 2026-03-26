import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../../../config/api";
import type { UserDashboard } from "../../types";

/**
 * Hook para buscar o total por usuarios
 */
export const useGetTotalByUser = () => {
	return useQuery({
		queryKey: ["user-total"],
		queryFn: async (): Promise<UserDashboard[]> => {
			const response = await fetch(`${BASE_URL}/api/Dashboard/GetTotalByUser`);
			if (!response.ok)
				throw new Error(`Failed to fetch user: ${response.status}`);
			return await response.json();
		},
		retry: false,
	});
};
