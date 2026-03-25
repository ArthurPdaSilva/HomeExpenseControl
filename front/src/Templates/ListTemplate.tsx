import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_Row,
	type MRT_RowData,
	type MRT_TableInstance,
} from "material-react-table";
import type { JSX } from "react";

type ListTemplateProps<T extends MRT_RowData> = {
	title: string;
	data: T[];
	isFetching: boolean;
	columns: MRT_ColumnDef<T, unknown>[];
	renderRowActionMenuItems?: ({
		row,
		table,
		closeMenu,
	}: {
		row: MRT_Row<T>;
		table: MRT_TableInstance<T>;
		closeMenu: () => void;
	}) => JSX.Element[];
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
	renderRowActionMenuItems,
}: ListTemplateProps<T>) => {
	return (
		<div className="flex flex-col flex-1 gap-5">
			<h1 className="text-4xl font-semibold">{title}</h1>
			<MaterialReactTable
				data={data}
				columns={columns}
				localization={{
					noRecordsToDisplay: `Sem ${title} para exibir`,
				}}
				muiTableContainerProps={{
					sx: { height: "450px" },
				}}
				state={{ isLoading: isFetching }}
				enableRowActions={!!renderRowActionMenuItems}
				renderRowActionMenuItems={renderRowActionMenuItems}
			/>
		</div>
	);
};
