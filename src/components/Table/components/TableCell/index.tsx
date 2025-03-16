import { TableHeaderType, TableRowType } from "../../lib/types";

export type TableCellProps = {
  row: TableRowType;
  header: TableHeaderType
}

const TableCellComponent: React.FC<TableCellProps> = ({ row, header }) => {
  const { name, CustomRenderComponent } = header;
  return CustomRenderComponent ? <CustomRenderComponent row={row} /> : row[name];
};

export default TableCellComponent;