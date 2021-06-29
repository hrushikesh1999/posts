import axios from "axios";

export default axios.create({
  baseURL: "https://fake-json-server-posts.herokuapp.com/",
});
