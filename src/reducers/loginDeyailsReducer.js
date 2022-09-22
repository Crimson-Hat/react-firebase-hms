export const loginDetailsReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_LOGIN_DETAILS":
      return action.payload;

    default:
      return state;
  }
};
