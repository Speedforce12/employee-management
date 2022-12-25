import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    toggleForm: false,
    toggleUpdate: false,
    userId: null,
    editUser: [],
  },
};

export const ReducerSlice = createSlice({
  name: "employee-management",
  initialState,
  reducers: {
    toggleAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },

    toggleUpdateForm: (state) => {
      state.client.toggleUpdate = !state.client.toggleUpdate;
    },

    getUserData: (state, action) => {
      state.client.userId = action.payload;
    },

    getEditUser: (state, action) => {
      state.client.editUser = action.payload;
    },
  },
});

export const { toggleAction, toggleUpdateForm, getUserData, getEditUser } =
  ReducerSlice.actions;

export default ReducerSlice.reducer;
