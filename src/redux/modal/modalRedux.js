const initialState = false;

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "MODAL":
      return action.payload;
    default:
      return state;
  }
};

export default modalReducer;

export const closeModal = () => (dispatch) => {
  dispatch({ type: "MODAL", payload: false });
};
export const openModal = () => (dispatch) => {
  dispatch({ type: "MODAL", payload: true });
};
