import { api } from "../apiClient";

export const getAccount = () => null;

export const updateAccount = () => null;

export const getFriends = () => null;

export const getPendingRequests = () => null;

export const sendFriendRequest = () => null;

export const removeFriend = () => null;

export const acceptFriendRequest = (id) =>
  api.post(`/account/${id}/friend/accept`);

export const declineFriendRequest = (id) =>
  api.post(`/account/${id}/friend/cancel`);
