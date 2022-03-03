import { AuthProvider, fetchUtils } from 'react-admin';

const apiUrl = import.meta.env.VITE_HEX_ADMIN_API_URL;
const httpClient = fetchUtils.fetchJson;

const authProvider: AuthProvider = {
  login: async function (params: {
    username: string;
    password: string;
  }): Promise<void> {
    const reqParams = {
      method: 'POST',
      body: JSON.stringify({
        username: params.username,
        password: params.password,
      }),
    };
    const { json } = await httpClient(`${apiUrl}/auth/login`, reqParams);
    localStorage.setItem('jwt', json.access_token);
  },

  logout: function (): Promise<void> {
    localStorage.removeItem('jwt');
    return Promise.resolve();
  },

  checkAuth: function (): Promise<void> {
    return localStorage.getItem('jwt') ? Promise.resolve() : Promise.reject();
  },

  checkError: function (error: { status: number }): Promise<void> {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('jwt');
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getPermissions: function (): Promise<any> {
    return Promise.resolve();
  },
};

export default authProvider;
