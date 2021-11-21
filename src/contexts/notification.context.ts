import { VariantType } from "notistack";
import React from "react";

/**
 * Context for notification
 */
export const NotificationContext = React.createContext({
  message: "",
  variant: "" as VariantType,
  setNotification: (payload: { message: string; variant: VariantType }) => {},
});
