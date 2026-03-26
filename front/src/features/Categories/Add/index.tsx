// import { useCreateCustomer } from "@/features/Customers/services";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CustomAlert } from "../../../components/CustomAlert";
import { ErrorField } from "../../../components/ErrorField";
import { FormButtons } from "../../../components/FormButtons";
import { useCreateCategory } from "../services";
import { EPurposeTypeMap } from "../types";
import { CategorySchema, type CategoryValidation } from "./schema";

/**
 * Componente da Página de Adição de Categoria
 * Contendo as informações de categorias
 */
export const AddCategory = () => {
	const { mutate: createCategory, isPending } = useCreateCategory();
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<CategoryValidation>({
		resolver: zodResolver(CategorySchema),
		defaultValues: {
			description: "",
			purpose: 1,
		},
	});

	const onSubmit = (data: CategoryValidation) => {
		createCategory(data, {
			onSuccess: () => {
				// To voltando para a home depois de salvar
				navigate("/categories");
				CustomAlert.success("Categoria criada com sucesso!");
			},
			onError: (error) => {
				console.error("Failed to create category:", error);
				CustomAlert.error("Falha ao criar categoria. Tente novamente.");
			},
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			// mx-auto é para alinhar ao centro
			className="mx-auto md:w-xl flex flex-col gap-6 md:mt-8 bg-white p-8 rounded-lg shadow-sm"
		>
			<h1 className="text-2xl font-semibold text-gray-800">
				Adicionar Categoria
			</h1>

			<div className="flex flex-col gap-4 mb-4">
				<div className="flex-1 flex flex-col gap-1">
					<label
						htmlFor="description"
						className="text-sm font-medium text-gray-700"
					>
						Descrição
					</label>
					<Controller
						name="description"
						control={control}
						render={({ field }) => (
							<input
								{...field}
								id="description"
								type="text"
								placeholder="Digite a descrição"
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
                    ${errors.description ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							/>
						)}
					/>
					{errors.description && (
						<ErrorField error={errors.description.message as string} />
					)}
				</div>

				<div className="flex-1 flex flex-col gap-1">
					<label
						htmlFor="purpose"
						className="text-sm font-medium text-gray-700"
					>
						Finalidade
					</label>
					<Controller
						name="purpose"
						control={control}
						render={({ field }) => (
							<select
								{...field}
								id="purpose"
								onChange={(e) => field.onChange(Number(e.target.value))}
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
										${errors.purpose ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							>
								{Object.entries(EPurposeTypeMap).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</select>
						)}
					/>
					{errors.purpose && (
						<ErrorField error={errors.purpose.message as string} />
					)}
				</div>
			</div>
			<FormButtons isPending={isPending} />
		</form>
	);
};
