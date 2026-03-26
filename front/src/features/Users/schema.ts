import { z } from "zod";

export const UserSchema = z.object({
	id: z.guid().optional(),
	name: z
		.string()
		.min(1, "O nome é obrigatório")
		.max(200, "O nome deve ter no máximo 200 caracteres"),
	age: z.number().min(1, "A idade não pode ser negativa"),
});

// Estou usando o mesmo tipo de validação para os dois formulários, já que as informações são as mesmas, a única diferença é o ID
export type UserValidation = z.infer<typeof UserSchema>;
