import { combineReducers } from "redux";
import persistReducer from "redux-persist/es/persistReducer";
import { authApi, employeeApi, walletApi } from "./services";

import tabsReducer, { persistConfig } from "./slices/tabs";
import authReducer from "./slices/auth";
import modalReducer from "./modal/modalRedux";

export const reducers = combineReducers({
  authStore: persistReducer(persistConfig, authReducer),
  tabsReducer: persistReducer(persistConfig, tabsReducer),
  [authApi.reducerPath]: authApi.reducer,
  [employeeApi.reducerPath]: employeeApi.reducer,
  [walletApi.reducerPath]: walletApi.reducer,
  modalReducer,
});

export const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    localStorage.clear();
    return reducers(undefined, action);
  }
  return reducers(state, action);
};
