export const personDetailsReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_PERSONDETAILS_DETAILS":
      return action.payload;

    default:
      return state;
  }
};
export const reportDetailsReducer = (state = "", action) => {
  switch (action.type) {
    case "SET_REPORT_DETAILS":
      return action.payload;

    default:
      return state;
  }
};
