import _ from "lodash";
import { CREATE_POST, FETCH_POSTS, DELETE_POST } from "../actions/Types";

const PostReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_POST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case DELETE_POST:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
export default PostReducer;
