import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ChannelsReducer from "./ChannelsReducer";
import ModalReducer from "./ModalReducer";
import PostReducer from "./PostReducer";
import AdminChannelReducer from "./AdminChannelsReducer";

export default combineReducers({
  auth: AuthReducer,
  open: ModalReducer,
  channels: ChannelsReducer,
  posts: PostReducer,
  adminChannels: AdminChannelReducer,
});
