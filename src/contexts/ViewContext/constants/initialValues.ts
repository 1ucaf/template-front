import { ViewContextType } from "..";

export const initialContextValue: ViewContextType = {
  notification: {
    show: () => {
      throw new Error("ViewContext: showNotification function is not implemented.");
    },
    hide: () => {
      throw new Error("ViewContext: hideNotification function is not implemented.");
    },
  },
  modal: {
    show: () => {
      throw new Error("ViewContext: showModal function is not implemented.");
    },
    hide: () => {
      throw new Error("ViewContext: hideModal function is not implemented.");
    },
  },
};