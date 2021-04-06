import { api } from '../apiClient';

export const register = (body) => api.post('/account/register', body);

export const login = () => null;

export const logout = () => null;

export const forgotPassword = () => null;

export const changePassword = () => null;

export const resetPassword = () => null;
