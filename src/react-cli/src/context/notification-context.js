import { createContext } from "react";

export const NotificationContext = createContext( { notifications: [],
setNotifications: () => {},
});