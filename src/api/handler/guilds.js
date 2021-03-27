import { api } from "../apiClient";

export const getUserGuilds = () => null;

export const createGuild = () => null;

export const joinGuild = () => null;

export const getInviteLink = () => null;

export const invalidateInviteLinks = () => null;

export const getGuildMembers = () => null;

export const editGuild = () => null;

export const deleteGuild = () => null;

export const getGuildMemberSettings = () => null;

export const changeGuildMemberSettings = () => null;

export const kickMember = () => null;

export const banMember = () => null;

export const leaveGuild = (id) => api.delete(`guilds/${id}`);

export const getBanList = (id) => api.get(`guilds/${id}/bans`);

export const unbanMember = (guildId, memberId) =>
  api.delete(`guilds/${guildId}/bans`, { data: { memberId } });
