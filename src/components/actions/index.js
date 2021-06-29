import Channels from "../api/Channels";
import history from "../history";
import {
  SIGN_IN,
  SIGN_OUT,
  HANDLE_OPEN,
  HANDLE_CLOSE,
  CREATE_CHANNEL,
  FETCH_CHANNELS,
  FETCH_CHANNEL,
  FETCH_ADMIN_CHANNELS,
  EDIT_CHANNEL,
  DELETE_CHANNEL,
  CREATE_POST,
  FETCH_POSTS,
  DELETE_POST,
} from "./Types";

export const signIn = (userId, name) => {
  return {
    type: SIGN_IN,
    userId: userId,
    name: name,
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
  };
};

export const ModalOpen = () => {
  return {
    type: HANDLE_OPEN,
  };
};

export const ModalClose = () => {
  return {
    type: HANDLE_CLOSE,
  };
};

export const createChannel = (channelName) => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const { name } = getState().auth;
  const response = await Channels.post("/channels", {
    nameOfChannel: channelName,
    userId,
    name,
  });
  dispatch({ type: CREATE_CHANNEL, payload: response.data });

  history.push(`/`);
};

export const fetchChannels = () => async (dispatch) => {
  const response = await Channels.get("/channels");
  dispatch({ type: FETCH_CHANNELS, payload: response.data });
};

export const fetchAdminChannels = () => async (dispatch, getState) => {
  const { userId } = getState().auth;
  if (userId) {
    const response = await Channels.get(`/channels?userId=${userId}`);
    dispatch({ type: FETCH_ADMIN_CHANNELS, payload: response.data });
  }
};

export const fetchChannel = (id) => async (dispatch) => {
  const response = await Channels.get(`/channels/${id}`);
  dispatch({ type: FETCH_CHANNEL, payload: response.data });
};

export const editChannel = (id, channelName) => async (dispatch) => {
  const response = await Channels.patch(`/channels/${id}`, {
    nameOfChannel: channelName,
  });
  dispatch({ type: EDIT_CHANNEL, payload: response.data });

  history.push(`/`);
};

export const deleteChannel = (id) => async (dispatch) => {
  await Channels.delete(`/channels/${id}`);
  dispatch({ type: DELETE_CHANNEL, payload: id });

  history.push(`/`);
};

export const createPost = (id, content) => async (dispatch, getState) => {
  const { name } = getState().auth;
  const response = await Channels.post("/posts", {
    channelId: id,
    description: content,
    name,
  });
  dispatch({ type: CREATE_POST, payload: response.data });
};

export const fetchPosts = (id) => async (dispatch) => {
  const response = await Channels.get(`/posts?postId=${id}`);
  dispatch({ type: FETCH_POSTS, payload: response.data });
};

export const deletePost = (id) => async (dispatch) => {
  await Channels.delete(`/posts/${id}`);
  dispatch({ type: DELETE_POST, payload: id });
};
