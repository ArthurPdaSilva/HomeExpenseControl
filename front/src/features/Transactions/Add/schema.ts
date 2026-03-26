import { z } from "zod";
import { ETransactionType } from "../types";

// Validação do schema de criação/edição de transação.
// Inclui `categoryPurpose` (valor numérico) para permitir validação cruzada
// entre o tipo da transação e a finalidade da categoria selecionada.
export const TransactionSchema = z.object({
	description: z
		.string()
		.min(1, "A descrição é obrigatória")
		.max(400, "A descrição deve ter no máximo 400 caracteres"),
	value: z
		.number()
		.min(0.01, "O valor deve ser um número positivo")
		.transform((value) => Number(value.toFixed(2))),
	type: z.enum(ETransactionType, {
		message: "O tipo da transação é obrigatório",
	}),
	categoryId: z.string("A categoria é obrigatória"),
	userId: z.string("O usuário é obrigatório"),
});
// Mesma ideia do Schema de Category
export type TransactionValidation = z.infer<typeof TransactionSchema>;
