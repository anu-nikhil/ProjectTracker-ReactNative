
import { USERDETAILS } from "../types/actions";
const initialState = {
  userDetails: {},
  userProjects: [],
  profilePic: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USERDETAILS.SET_USERDETAILS:
      return {
        ...state, userDetails: action.payload,
      };
      break;
    case USERDETAILS.SET_USERPROJECTS:
      return {
        ...state, userProjects: action.payload,
      };
      break;
    case USERDETAILS.SET_PROFILE_PIC:
      return {
        ...state, profilePic: action.payload,
      };
      break;
    case USERDETAILS.LOGOUT:
      return {
        ...state, userProjects: [],
        ...state, profilePic: null,
        ...state, userDetails: {},
      };
      break;
    default:
      return state;
  }
};
