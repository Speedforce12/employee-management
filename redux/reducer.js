import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    toggleForm: false,
    toggleUpdate: false,
    userId: null,
    modal: { isOpen: false },
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

    openConfirmModal: (state) => {
      state.client.modal.isOpen = !state.client.modal.isOpen;
    },
  },
});

export const { toggleAction, toggleUpdateForm, getUserData, getEditUser, openConfirmModal } =
  ReducerSlice.actions;

export default ReducerSlice.reducer;
