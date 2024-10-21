import {
  createUser,
  fetchUser,
  fetchUserById,
  updateUser,
  deleteUser,
  register,
  login,
  channel,
  fetchChannel,
  fetchChannelById,
  fetchUserByChannelId,
  fetchComments,
  commentAdd,
  commentEdit,
  commentDelete,
} from "../Controller/User.controller.js";

export function Routes(server) {
  server.post("/User", createUser);
  server.get("/Users", fetchUser);
  server.get("/User/channels", fetchChannel);
  server.get("/User/:id", fetchUserById);
  server.get("/channel/:channelId", fetchChannelById);
  server.get("/User/byChannel/:channelId", fetchUserByChannelId);
  server.get("/videos/:videoId/comments", fetchComments);
  server.put("/User/:id", updateUser);
  server.delete("/User/:id", deleteUser);
  server.post("/User/register", register);
  server.post("/User/login", login);
  server.post("/createChannel/:id", channel);
  server.post("/videos/:videoId/comments", commentAdd);
  server.put("/videos/:videoId/comments/:commentId", commentEdit);
  server.delete("/videos/:videoId/comments/:commentId", commentDelete);
}
