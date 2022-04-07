import { configureStore } from "@reduxjs/toolkit";
import AppSlice, { AppState } from "./app-state";

export type GlobalState = {
    app: AppState
}

const store = configureStore<GlobalState>({
  reducer: {
    app: AppSlice.reducer,
  },
});

export default store;
