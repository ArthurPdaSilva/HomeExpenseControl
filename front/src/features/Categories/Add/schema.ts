import { z } from "zod";
import { EPurposeType } from "../types";

export const CategorySchema = z.object({
	description: z
		.string()
		.min(1, "A descrição é obrigatória")
		.max(400, "A descrição deve ter no máximo 400 caracteres"),
	purpose: z.enum(EPurposeType, {
		message: "A finalidade é obrigatória",
	}),
});

// Schema com nome genérico, porém caso surgisse a necessidade de uma tela de edição de categoria, eu poderia reutilizar esse schema
export type CategoryValidation = z.infer<typeof CategorySchema>;
