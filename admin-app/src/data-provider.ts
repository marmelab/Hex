import { fetchUtils } from 'react-admin';

const apiUrl = import.meta.env.VITE_HEX_ADMIN_API_URL;
const httpClient = fetchUtils.fetchJson;

export default {
  getList: (resource: string) => {
    const url = `${apiUrl}/${resource}/`;

    return httpClient(url).then(({ json }) => ({
      data: json,
      total: json.length,
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
