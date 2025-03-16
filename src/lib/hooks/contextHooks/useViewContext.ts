import { useContext } from "react";
import { ViewContext, ViewContextType } from "../../../contexts/ViewContext";

export const useViewContext = (): ViewContextType => useContext(ViewContext);