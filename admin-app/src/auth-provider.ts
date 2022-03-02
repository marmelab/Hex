import { AuthProvider, fetchUtils } from 'react-admin';

const apiUrl = 'https://d1iqp7uyjrmy2a.cloudfront.net/api'; // FIXME
const httpClient = fetchUtils.fetchJson;

const authProvider: AuthProvider = {
  login: function (params: any): Promise<any> {
    const reqParams = {
      method: 'POST',
      body: JSON.stringify({
        username: params.username,
        password: params.password,
      }),
    };
    return httpClient(`${apiUrl}/auth/login`, reqParams).then(({ json }) => {
      localStorage.setItem('jwt', json.access_token);
    });
  },
  logout: function (params: any): Promise<string | false | void> {
    localStorage.removeItem('jwt');
    return Promise.resolve();
  },
  checkAuth: function (params: any): Promise<void> {
    return localStorage.getItem('jwt') ? Promise.resolve() : Promise.reject();
  },
  checkError: function (error: any): Promise<void> {
    if (error.status === 401 || error.status === 403) {
      localStorage.removeItem('jwt');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: function (params: any): Promise<any> {
    return Promise.resolve();
  },
};

export default authProvider;
