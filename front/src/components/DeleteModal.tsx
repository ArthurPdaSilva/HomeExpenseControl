import { X } from "lucide-react";

type DeleteModalProps = {
	handleConfirm: () => void;
	handleDeny: () => void;
	open: boolean;
};

/**
 * Modal de Confirmação de Exclusão
 * Contendo as informações de confirmação de ação, com um overlay escuro e um box centralizado com a mensagem de alerta e os botões de confirmação e negação.
 */
export const DeleteModal = ({
	handleConfirm,
	handleDeny,
	open,
}: DeleteModalProps) => {
	if (!open) return null;

	return (
		// Overlay (o fundo escuro)
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			{/* Box Principal (Content) */}
			<div className="flex w-full max-w-fit flex-col rounded-md bg-white p-4 shadow-xl">
				{/* Header */}
				<div className="flex w-full items-center justify-between border-b border-gray-300 pb-2">
					<h2 className="text-xl font-semibold text-gray-800">
						Confirmação de exclusão
					</h2>
					<button
						type="button"
						onClick={handleDeny}
						className="cursor-pointer rounded-full p-1 hover:bg-gray-100 transition-colors"
					>
						<X size={24} className="text-gray-500" />
					</button>
				</div>

				{/* Mensagem de Alerta */}
				<div className="my-4 rounded-sm bg-[#f5d9dd] p-4 text-red-600">
					<p className="text-base">
						A ação de exclusão não poderá ser desfeita.
					</p>
				</div>

				{/* Footer (Ações) */}
				<div className="flex w-full justify-end gap-4 border-t border-gray-300 pt-4">
					<button
						type="button"
						onClick={handleDeny}
						className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
					>
						Não
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 shadow-sm transition-colors cursor-pointer"
					>
						Sim
					</button>
				</div>
			</div>
		</div>
	);
};
