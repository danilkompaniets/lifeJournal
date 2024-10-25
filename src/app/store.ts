import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "@/features/auth/authSlice";
import {authApi} from "@/services/authService.ts";
import {dayResultsApi} from "@/services/dayResultsService.ts";
import {goalsApi} from "@/services/goalsService.ts";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [dayResultsApi.reducerPath]: dayResultsApi.reducer,
        [goalsApi.reducerPath]: goalsApi.reducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat(authApi.middleware)
        .concat(dayResultsApi.middleware)
        .concat(goalsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;


export default store;
