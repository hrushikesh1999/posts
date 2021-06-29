import _ from "lodash";
import {
  CREATE_CHANNEL,
  FETCH_CHANNELS,
  FETCH_CHANNEL,
  EDIT_CHANNEL,
  DELETE_CHANNEL,
  FETCH_ADMIN_CHANNELS,
} from "../actions/Types";

const ChannelsReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CHANNEL:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_ADMIN_CHANNELS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_CHANNELS:
      return { ...state, ..._.mapKeys(action.payload, "id") };
    case FETCH_CHANNEL:
      return { ...state, [action.payload.id]: action.payload };
    case EDIT_CHANNEL:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_CHANNEL:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default ChannelsReducer;
