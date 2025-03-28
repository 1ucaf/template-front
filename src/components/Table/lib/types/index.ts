import { ChangeEventHandler, MouseEvent } from "react";

export type TableRowType = { [key: string]: any };
export type TableHeaderType<T = TableRowType> = { name: string; label: string, CustomRenderComponent?: React.FC<{row: T}> };
export type TableActionType<T = TableRowType> = {
  label: string;
  onClick: (row: T) => void;
  condition?: boolean | ((row: T) => boolean | undefined);
}
export type SearchPropType = {
  onType?: (value: string) => void;
  onClickSearchButton?: (term?: string) => void;
  placeholder?: string
}
export type PaginationPropType = {
  page: number;
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, page: number) => void;
  totalRows: number;
  rowsPerPage: number;
  onRowsPerPageChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
  rowsPerPageOptions?: number[];
}