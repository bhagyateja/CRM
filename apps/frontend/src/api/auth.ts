// src/api/auth.ts
import API from './axios'; // assumes axios instance is configured here

// ----------------------------
// Login
// ----------------------------
export const login = async (credentials: { email: string; password: string }) => {
  const res = await API.post('/auth/login', credentials, {
    withCredentials: true, // ✅ Important for cookie/session auth
  });
  return res.data;
};

// ----------------------------
// Register (User + Optional Organization)
// ----------------------------
export const register = async (payload: { email: string; password: string; orgName?: string }) => {
  const res = await API.post('/auth/register', payload, {
    withCredentials: true,
  });
  return res.data;
};

// ----------------------------
// Logout
// ----------------------------
export const logout = async () => {
  const res = await API.post('/auth/logout', {}, {
    withCredentials: true,
  });
  return res.data;
};

// ----------------------------
// Get Current Logged-In User
// ----------------------------
export const getCurrentUser = async () => {
  const res = await API.get('/auth/me', {
    withCredentials: true,
  });
  return res.data;
};
