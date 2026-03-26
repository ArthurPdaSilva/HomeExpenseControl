import { decimalToReal } from "../utils/decimalToReal";

const valueMapColor = (value: number) => {
	if (value > 0) {
		return "text-green-700";
	}
	if (value < 0) {
		return "text-red-700";
	}
	return "";
};

type ValueFieldProps = {
	value: number;
};

/**
 * Componente para exibir um valor formatado como Real (BRL) com cor indicativa.
 */
export const ValueField = ({ value }: ValueFieldProps) => {
	return <span className={valueMapColor(value)}>{decimalToReal(value)}</span>;
};
