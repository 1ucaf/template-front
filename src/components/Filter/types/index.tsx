import { Dispatch } from "react";

export type FilterPopupProps = {
  title: string;
  value: any;
  onChange: Dispatch<React.SetStateAction<{}>>;
  name: string;
  optionMapper?: Record<string, string>;
  preview?: string;
  options?: any[];
}