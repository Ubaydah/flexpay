import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

const initialState = {
  employeesTab: "",
  transactionsTab: "",
  settingsTab: "personal",
};

export const persistConfig = {
  storage: storage,
  key: "root",
};

const tabsSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    toggleEmployeesTab: (state, action) => {
      state.employeesTab = action.payload;
    },
    toggleTxnsTab: (state, action) => {
      state.transactionsTab = action.payload;
    },
    toggleSettingsTab: (state, action) => {
      state.settingsTab = action.payload;
    },
  },
});

export const { toggleSettingsTab, toggleEmployeesTab, toggleTxnsTab } = tabsSlice.actions;

export default tabsSlice.reducer;
