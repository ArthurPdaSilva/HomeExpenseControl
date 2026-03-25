import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_RowData,
} from "material-react-table";

type ListTemplateProps<T extends MRT_RowData> = {
	title: string;
	data: T[];
	isFetching: boolean;
	columns: MRT_ColumnDef<T, unknown>[];
};

/**
 * Componente Template para Listagem de Dados
 * Utiliza Generics para ser flexível e reutilizável entre as páginas de listagem (ex: Usuários, Categorias, etc)
 */
export const ListTemplate = <T extends MRT_RowData>({
	title,
	data,
	isFetching,
	columns,
}: ListTemplateProps<T>) => {
	return (
		<div className="flex flex-col flex-1 gap-5">
			<h1 className="text-4xl font-semibold">{title}</h1>
			<MaterialReactTable
				data={data}
				columns={columns}
				localization={{
					noRecordsToDisplay: `Sem ${title} para exibir`, // Sua mensagem personalizada aqui
				}}
				muiTableContainerProps={{
					sx: { height: "450px" },
				}}
				state={{ isLoading: isFetching }}
			/>
		</div>
	);
};
