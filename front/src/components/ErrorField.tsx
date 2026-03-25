/**
 * Componente para exibir mensagens de erro abaixo dos campos de formulário
 */
export const ErrorField = ({ error }: { error?: string }) => {
	if (!error) return null;

	return <span className="text-xs text-red-500">{error}</span>;
};
