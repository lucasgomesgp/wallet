import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import operationsSlice from "./operations-slice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        operations: operationsSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions: ["auth/action/payload"]
            }
        })

});