import { TableActionType, TableRowType } from "../types";

export const getFilteredActions = (actions: TableActionType[] | undefined, row: TableRowType) => {
  return actions?.filter((action) => {
    if(typeof action.condition === 'boolean') return action.condition;
    if (action.condition === undefined || action.condition === null) return true;
    return action.condition(row);
  }) || [];
}