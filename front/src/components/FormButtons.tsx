import { useNavigate } from "react-router";
import { SpinIcon } from "./SpinIcon";

/**
 * O footer dos formulárioo são sempre os mesmos, então criei um componente para evitar repetição de código, ele recebe o isPending para desabilitar os botões e mostrar o spinner quando estiver salvando
 */
export const FormButtons = ({ isPending }: { isPending: boolean }) => {
	const navigate = useNavigate();

	return (
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
	);
};
