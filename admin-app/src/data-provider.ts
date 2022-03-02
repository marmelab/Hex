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
    throw Error();
  },

  getMany: (resource: any) => {
    throw Error();
  },

  getManyReference: (resource: any) => {
    throw Error();
  },

  update: (resource: any) => {
    throw Error();
  },

  updateMany: (resource: any) => {
    throw Error();
  },

  create: (resource: any) => {
    throw Error();
  },

  delete: (resource: any) => {
    throw Error();
  },

  deleteMany: (resource: any) => {
    throw Error();
  },
};
