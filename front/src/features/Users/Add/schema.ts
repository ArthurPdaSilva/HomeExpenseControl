import { z } from "zod";

export const UserSchema = z.object({
	name: z
		.string()
		.min(1, "O nome é obrigatório")
		.max(200, "O nome deve ter no máximo 200 caracteres"),
	age: z.number().min(1, "A idade não pode ser negativa"),
});

export type UserValidation = z.infer<typeof UserSchema>;
