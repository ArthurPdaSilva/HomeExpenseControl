// As recomendações para enums em TypeScript é usar objetos com as chaves como os nomes dos enums e os valores como os valoresdos enums, usando o "as const" para garantir que os valores sejam tratados como literais. Dessa forma, podemos criar um tipo que representa os valores possíveis do enum.
export const EPurposeType = {
	Expense: 1, // Despesas
	Income: 2, // Receitas
	Both: 3, // Ambos
} as const;

export type EPurposeType = (typeof EPurposeType)[keyof typeof EPurposeType];

export type Category = {
	Id: string;
	Description: string;
	Purpose: EPurposeType;
};

// Pegar a label através do valor do enum, caso o valor não exista, retornar o valor como string
export const EPurposeTypeMap: Record<EPurposeType, string> = {
	[EPurposeType.Expense]: "Despesa",
	[EPurposeType.Income]: "Receita",
	[EPurposeType.Both]: "Ambos",
};

export const getPurposeLabel = (value: EPurposeType) =>
	EPurposeTypeMap[value] ?? String(value);
