import { QueryClient } from "@tanstack/react-query";

// Movi para um arquivo separado, pois o queryClient é utilizado em vários lugares da aplicação e dessa forma evito criar múltiplas instâncias do QueryClient, o que estava causando problemas de cache
export const queryClient = new QueryClient();
