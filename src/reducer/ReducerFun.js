const FormReducer = (state, action) => {
  switch (action.type) {
    case "registerForm":
      return { ...state, [action.field]: action.payload };

    default:
      return state;
  }
};

export default FormReducer;
