import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { paramsSlice } from './paramsSlice';

export const rootReducer = combineReducers({
    paramsSlice: paramsSlice.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppState = ReturnType<typeof setupStore>;
export type AppDispatch = AppState['dispatch'];
