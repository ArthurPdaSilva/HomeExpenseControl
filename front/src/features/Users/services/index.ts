import { useQuery } from "@tanstack/react-query";
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
