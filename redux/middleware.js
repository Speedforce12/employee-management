import { createListenerMiddleware } from "@reduxjs/toolkit";
import { getUserData, toggleUpdateForm } from "./reducer";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: toggleUpdateForm,
  effect: async (action, listenerApi) => {
    listenerApi.dispatch(getUserData(action.payload));
  },
});

export default listenerMiddleware;
