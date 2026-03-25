// To pegando a url da API a partir de uma variável de ambiente, caso ela exista, ou usando o http://localhost:8080 como valor padrão
export const BASE_URL =
	import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
