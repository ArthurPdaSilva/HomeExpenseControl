export type GeneralDashboard = {
	totalIncome: number;
	totalExpense: number;
	balance: number;
};

export type UserDashboard = GeneralDashboard & {
	userId: string;
	userName: string;
};

export type CategoryDashboard = GeneralDashboard & {
	categoryId: string;
	categoryDescription: string;
};
