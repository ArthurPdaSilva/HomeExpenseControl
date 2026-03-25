import { IconButton, Tooltip } from "@mui/material";
import { Plus } from "lucide-react";
import {
	MaterialReactTable,
	type MRT_ColumnDef,
	type MRT_Row,
	type MRT_RowData,
	MRT_ShowHideColumnsButton,
	type MRT_TableInstance,
	MRT_ToggleDensePaddingButton,
	MRT_ToggleFiltersButton,
	MRT_ToggleFullScreenButton,
	MRT_ToggleGlobalFilterButton,
} from "material-react-table";
import type { JSX } from "react";

type ListTemplateProps<T extends MRT_RowData> = {
	title: string;
	data: T[];
	isFetching: boolean;
	columns: MRT_ColumnDef<T, unknown>[];
	handleAdd: () => void;
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
	handleAdd,
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
				renderToolbarInternalActions={({ table }) => (
					<>
						<MRT_ToggleGlobalFilterButton table={table} />
						{/* Estou basicamente dando um override nos botões internos e adicionando meu botão de add */}
						<Tooltip title={`Adicionar ${title}`} placement="bottom">
							<IconButton sx={{ color: "gray" }} onClick={handleAdd}>
								<Plus />
							</IconButton>
						</Tooltip>
						<MRT_ToggleFiltersButton table={table} />
						<MRT_ShowHideColumnsButton table={table} />
						<MRT_ToggleDensePaddingButton table={table} />
						<MRT_ToggleFullScreenButton table={table} />
					</>
				)}
			/>
		</div>
	);
};
