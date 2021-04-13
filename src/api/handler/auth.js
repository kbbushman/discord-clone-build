import { api } from '../apiClient';

export const register = (body) => api.post('/account/register', body);

export const login = (body) => api.post('/account/login', body);

export const logout = () => null;

export const forgotPassword = (email) =>
  api.post('/account/fogot-password', { email });

export const changePassword = () => null;

export const resetPassword = () => null;
