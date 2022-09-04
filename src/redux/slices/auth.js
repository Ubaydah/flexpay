import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  authorization: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginUser: (state, { payload }) => {
      state.user = payload?.data;
      state.authorization = payload?.data.tokens;
    },
  },
});

export const { setLoginUser } = authSlice.actions;
const { reducer } = authSlice;
export default reducer;
