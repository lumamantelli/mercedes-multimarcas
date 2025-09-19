const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const api = {
  usuarios: `${BASE_URL}/api/usuarios`,
  login: `${BASE_URL}/api/login`,
  logout: `${BASE_URL}/api/logout`,
  verify: `${BASE_URL}/api/auth/verify`
};
