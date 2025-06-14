import { AxiosError } from "axios";
import { useEffect } from "react";
import { APIBaseError } from "../types/errors/commonError.type";
import { useViewContext } from "./contextHooks/useViewContext";

export const useDefaultErrorHandler = (error: AxiosError<APIBaseError, any> | null | undefined) => {
  const { notification } = useViewContext();
  useEffect(() => {
    if(error) {
      notification.show({
        content: error.response?.data.message || error.message,
        severity: 'error',
      });
    }
  }, [error]);
};