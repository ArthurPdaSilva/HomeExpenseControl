// import { useCreateCustomer } from "@/features/Customers/services";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { CustomAlert } from "../../../components/CustomAlert";
import { ErrorField } from "../../../components/ErrorField";
import { FormButtons } from "../../../components/FormButtons";
import { useGetCategories } from "../../Categories/services";
import { EPurposeType, getPurposeLabel } from "../../Categories/types";
import { useGetUsers } from "../../Users/services";
import { useCreateTransaction } from "../services";
import { ETransactionType, ETransactionTypeMap } from "../types";
import { TransactionSchema, type TransactionValidation } from "./schema";

/**
 * Componente da Página de Adição de Transação
 * Contendo as informações de transações
 */
export const AddTransaction = () => {
	const { mutate: createTransaction, isPending } = useCreateTransaction();
	const { data: categories, isPending: isCategoriesPending } =
		useGetCategories();
	const { data: users, isPending: isUsersPending } = useGetUsers();
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<TransactionValidation>({
		resolver: zodResolver(TransactionSchema),
	});

	// Optei por useEffect, pois preciso que ele sete a category e o use padrão assim que eles são carregados no front
	useEffect(() => {
		if (!categories || !users) return;
		reset({
			description: "",
			value: 0,
			type: ETransactionType.Expense,
			categoryId: categories[0].id,
			userId: users[0].id,
		});
	}, [categories, users, reset]);

	const onSubmit = (data: TransactionValidation) => {
		// Checagens extras
		const errorsList: string[] = [];

		//Se a categoria selecionada for de receita, não pode criar uma transação de despesa e vice-versa
		const selectedCategory = categories?.find(
			(category) => category.id === data.categoryId,
		);
		if (selectedCategory) {
			const categoryPurpose = selectedCategory.purpose;
			if (
				(categoryPurpose === EPurposeType.Expense &&
					data.type === ETransactionType.Income) ||
				(categoryPurpose === EPurposeType.Income &&
					data.type === ETransactionType.Expense)
			) {
				errorsList.push(
					`A categoria selecionada é para ${getPurposeLabel(
						categoryPurpose,
					).toLowerCase()}, não é possível criar uma transação de ${ETransactionTypeMap[
						data.type
					].toLowerCase()}.`,
				);
			}
		}

		//Verificar se o usuário é menor de idade, se sim não é permitido criar transações de receita
		const selectedUser = users?.find((user) => user.id === data.userId);
		if (
			selectedUser &&
			selectedUser.age < 18 &&
			data.type === ETransactionType.Income
		) {
			errorsList.push(
				`O usuário selecionado é menor de idade, não é permitido criar transações de receita para usuários menores de 18 anos.`,
			);
		}

		console.log("Erros de validação extra:", errorsList);

		if (errorsList.length > 0) {
			// biome-ignore lint/suspicious/useIterableCallbackReturn: Biome tá sugerindo usar map, mas nesse caso não é necessário, pois o forEach já é suficiente para exibir os erros
			errorsList.forEach((err) => CustomAlert.error(err));
			return;
		}

		createTransaction(data, {
			onSuccess: () => {
				// To voltando para a home depois de salvar
				navigate("/transactions");
				CustomAlert.success("Transação criada com sucesso!");
			},
			onError: (error) => {
				console.error("Failed to create transaction:", error);
				CustomAlert.error("Falha ao criar transação. Tente novamente.");
			},
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="mx-auto md:w-xl flex flex-col gap-6 md:mt-8 bg-white p-8 rounded-lg shadow-sm"
		>
			<h1 className="text-2xl font-semibold text-gray-800">
				Adicionar Transação
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
					<label htmlFor="value" className="text-sm font-medium text-gray-700">
						Valor
					</label>
					<Controller
						name="value"
						control={control}
						render={({ field }) => (
							<input
								{...field}
								id="value"
								type="number"
								onChange={(e) => field.onChange(e.target.valueAsNumber)}
								step="0.01"
								placeholder="0.00"
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
        ${errors.value ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							/>
						)}
					/>
					{errors.value && (
						<ErrorField error={errors.value.message as string} />
					)}
				</div>

				<div className="flex-1 flex flex-col gap-1">
					<label htmlFor="type" className="text-sm font-medium text-gray-700">
						Tipo
					</label>
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<select
								{...field}
								id="type"
								onChange={(e) => field.onChange(Number(e.target.value))}
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
										${errors.type ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							>
								{Object.entries(ETransactionTypeMap).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</select>
						)}
					/>
					{errors.type && <ErrorField error={errors.type.message as string} />}
				</div>

				<div className="flex-1 flex flex-col gap-1">
					<label
						htmlFor="categoryId"
						className="text-sm font-medium text-gray-700"
					>
						Categoria
					</label>
					<Controller
						name="categoryId"
						control={control}
						render={({ field }) => (
							<select
								{...field}
								id="categoryId"
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
										${errors.categoryId ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							>
								{categories?.map(({ id, description, purpose }) => (
									<option key={id} value={id}>
										{/* Apenas fazendo uma checagem de description é grande, se sim ele cortará o final e adicionará reticências */}
										{description.length > 20
											? `${description.slice(0, 20)}...`
											: description}{" "}
										- {getPurposeLabel(purpose)}
									</option>
								))}
							</select>
						)}
					/>
					{errors.categoryId && (
						<ErrorField error={errors.categoryId.message as string} />
					)}
				</div>

				<div className="flex-1 flex flex-col gap-1">
					<label htmlFor="userId" className="text-sm font-medium text-gray-700">
						Pessoa
					</label>
					<Controller
						name="userId"
						control={control}
						render={({ field }) => (
							<select
								{...field}
								id="userId"
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
										${errors.userId ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							>
								{users?.map(({ id, name, age }) => (
									<option key={id} value={id}>
										{name} - {age} anos
									</option>
								))}
							</select>
						)}
					/>
					{errors.userId && (
						<ErrorField error={errors.userId.message as string} />
					)}
				</div>
			</div>
			<FormButtons
				isPending={isPending || isCategoriesPending || isUsersPending}
			/>
		</form>
	);
};
