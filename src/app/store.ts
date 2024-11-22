import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/features/auth/authSlice";
import {authApi} from "@/services/authService.ts";
import {dayResultsApi} from "@/services/dayResultsService.ts";
import {usersApi} from "@/services/usersService.ts";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [dayResultsApi.reducerPath]: dayResultsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(dayResultsApi.middleware)
        .concat(usersApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;
