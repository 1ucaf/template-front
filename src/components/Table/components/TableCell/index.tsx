import { TableHeaderType, TableRowType } from "../../lib/types";

export type TableCellProps<T extends TableRowType> = {
  row: T;
  header: TableHeaderType<T>;
}

const TableCellComponent = <T extends TableRowType>({ row, header }: TableCellProps<T>) => {
  const { name, CustomRenderComponent } = header;
  return CustomRenderComponent ? <CustomRenderComponent row={row} /> : row[name];
};

export default TableCellComponent;