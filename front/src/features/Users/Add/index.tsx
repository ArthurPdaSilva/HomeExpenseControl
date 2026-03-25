// import { useCreateCustomer } from "@/features/Customers/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ErrorField } from "../../../components/ErrorField";
import { SpinIcon } from "../../../components/SpinIcon";
import { useCreateUser } from "../services";
import { UserSchema, type UserValidation } from "./schema";

export const AddUser = () => {
	const { mutate: createUser, isPending } = useCreateUser();
	const navigate = useNavigate();

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<UserValidation>({
		resolver: zodResolver(UserSchema),
		defaultValues: {
			name: "",
			age: 0,
		},
	});

	const onSubmit = (data: UserValidation) => {
		createUser(data, {
			onSuccess: () => {
				// To voltando para a home depois de salvar
				navigate("/");
			},
		});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			// mx-auto é para alinhar ao centro
			className="m-auto md:w-xl flex flex-col gap-6 bg-white p-8 rounded-lg shadow-sm"
		>
			<h1 className="text-2xl font-semibold text-gray-800">
				Adicionar Usuário
			</h1>

			<div className="flex flex-col gap-4 mb-4">
				<div className="flex-1 flex flex-col gap-1">
					<label htmlFor="name" className="text-sm font-medium text-gray-700">
						Nome
					</label>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<input
								{...field}
								id="name"
								type="text"
								placeholder="Digite o nome"
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
                    ${errors.name ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							/>
						)}
					/>
					{errors.name && <ErrorField error={errors.name.message} />}
				</div>

				<div className="flex-1 flex flex-col gap-1">
					<label htmlFor="age" className="text-sm font-medium text-gray-700">
						Idade
					</label>
					<Controller
						name="age"
						control={control}
						render={({ field }) => (
							<input
								{...field}
								id="age"
								type="number"
								// O valueAsNumber é necessário para garantir que o valor seja tratado como número, já que o input do tipo number retorna uma string por padrão. Sem isso, a validação do Zod não funcionaria corretamente, já que ele espera um número.
								onChange={(e) => field.onChange(e.target.valueAsNumber)}
								placeholder="00"
								className={`w-full px-3 py-2 border rounded-md outline-none transition-all
                    ${errors.age ? "border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
							/>
						)}
					/>
					{errors.age && <ErrorField error={errors.age.message} />}
				</div>
			</div>

			<div className="flex gap-2 justify-end w-full">
				<button
					id="btn-cancel"
					type="button"
					onClick={() => navigate(-1)}
					disabled={isPending}
					className="cursor-pointer px-8 py-2.5 bg-white text-gray-700 font-semibold rounded-md hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
				>
					Voltar
				</button>
				<button
					id="btn-save"
					type="submit"
					disabled={isPending}
					className="cursor-pointer px-8 py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
				>
					{isPending ? (
						<>
							<SpinIcon />
							Salvando...
						</>
					) : (
						"Salvar"
					)}
				</button>
			</div>
		</form>
	);
};
