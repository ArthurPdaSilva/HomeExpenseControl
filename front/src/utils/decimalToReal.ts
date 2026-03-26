/**
 * Função para converter um número decimal em uma string formatada como moeda Real (BRL).
 * O valor fica verde se for positivo e vermelho se for negativo.
 */
export const decimalToReal = (value: number) => {
	const formattedValue = value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return formattedValue;
};
