// Segui, basicamente, a mesma logística aplicada a parte de Categories
export const ETransactionType = {
	Expense: 1, // Despesas
	Income: 2, // Receitas
} as const;

export type ETransactionType =
	(typeof ETransactionType)[keyof typeof ETransactionType];

export type Transaction = {
	id: string;
	description: string;
	value: number;
	type: ETransactionType;
	categoryDescription: string;
	userName: string;
};

export const ETransactionTypeMap: Record<ETransactionType, string> = {
	[ETransactionType.Expense]: "Despesa",
	[ETransactionType.Income]: "Receita",
};

export const getTransactionTypeLabel = (value: ETransactionType) =>
	ETransactionTypeMap[value] ?? String(value);
