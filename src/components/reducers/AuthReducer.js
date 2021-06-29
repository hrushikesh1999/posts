import { SIGN_IN, SIGN_OUT } from "../actions/Types";

const INTIAL_STATE = {
  isSignedIn: null,
  userId: null,
  name: null,
};

const AuthReducer = (state = INTIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        userId: action.userId,
        name: action.name,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null, name: null };
    default:
      return state;
  }
};

export default AuthReducer;
