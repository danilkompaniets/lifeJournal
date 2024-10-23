import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/features/auth/authSlice";
import {authApi} from "@/services/auth/authService.ts";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;
