import { configureStore } from "@reduxjs/toolkit";

import authSlice from "./features/auth/authSlice";

const isDevelopment = process.env.NODE_ENV === "development";

const store = configureStore({
    reducer: { auth: authSlice },
    devTools: isDevelopment,
});

export default store;
