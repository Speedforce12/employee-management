import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: {
    toggleForm: false,
    toggleUpdate: false,
    employeeId: null,
    modal: { isOpen: false },
    mainModal: { show: false, content: null, title: null},
  }
};

export const ReducerSlice = createSlice({
  name: "employee-management",
  initialState,
  reducers: {

    toggleMainModal: (state, action) => { 
      state.client.mainModal = action.payload
    },
    toggleAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },

    toggleUpdateForm: (state) => {
      state.client.toggleUpdate = !state.client.toggleUpdate;
    },

    getUserData: (state, action) => {
      state.client.employeeId = action.payload;
    },

    openConfirmModal: (state) => {
      state.client.modal.isOpen = !state.client.modal.isOpen;
    },
  },
});

export const {
  toggleAction,
  toggleUpdateForm,
  getUserData,
  getEditUser,
  openConfirmModal,
  toggleMainModal,
} = ReducerSlice.actions;

export default ReducerSlice.reducer;
