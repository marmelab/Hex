import { fetchUtils, Options } from 'react-admin';

const adminApiUrl = `${import.meta.env.VITE_HEX_ADMIN_API_URL}/admin`;

const httpClient = (url: string, options: Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    options.headers.set('Authorization', `Bearer ${jwt}`);
  }
  return fetchUtils.fetchJson(url, options);
};

export default {
  getList: (resource: string) => {
    const url = `${adminApiUrl}/${resource}/`;
    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  getOne: (resource: any) => {
    throw Error('This function is not yet implemented');
  },

  getMany: (resource: any) => {
    throw Error('This function is not yet implemented');
  },

  getManyReference: (resource: any) => {
    throw Error('This function is not yet implemented');
  },

  update: (resource: any) => {
    throw Error('This function is not yet implemented');
  },

  updateMany: (resource: any) => {
    throw Error('This function is not yet implemented');
  },

  create: (resource: any) => {
    throw Error('This function is not yet implemented');
  },

  delete: (resource: any) => {
    throw Error('This function is not yet implemented');
  },

  deleteMany: (resource: any) => {
    throw Error('This function is not yet implemented');
  },
};
