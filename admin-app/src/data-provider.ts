import { fetchUtils, Options, DataProvider } from 'react-admin';
import { stringify } from 'query-string';

const adminApiUrl = `${import.meta.env.VITE_HEX_ADMIN_API_URL}/admin`;

const httpClient = (url: string, options: Options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  const jwt = localStorage.getItem('jwt');
  if (jwt) {
    options.headers = new Headers({
      ...options.headers,
      Authorization: `Bearer ${jwt}`,
    });
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider: DataProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      s: JSON.stringify({
        skip: (page - 1) * perPage,
        take: perPage,
        sort: [{ column: field, order: order }],
        filter: Object.keys(params.filter).map((key) => ({
          column: key,
          value: params.filter[key],
        })),
      }),
    };
    const url = `${adminApiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  getOne: (resource, params) => {
    const url = `${adminApiUrl}/${resource}/${params.id}`;

    return httpClient(url).then(({ json }) => ({
      data: json,
    }));
  },

  getMany: (resource) => {
    throw Error('This function is not yet implemented');
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const filter = [
      ...Object.keys(params.filter).map((key) => ({
        column: key,
        value: params.filter[key],
      })),
      {
        column: params.target,
        value: params.id,
      },
    ];
    const query = {
      s: JSON.stringify({
        skip: (page - 1) * perPage,
        take: perPage,
        sort: [{ column: field, order: order }],
        filter,
      }),
    };
    const url = `${adminApiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  update: (resource) => {
    throw Error('This function is not yet implemented');
  },

  updateMany: (resource) => {
    throw Error('This function is not yet implemented');
  },

  create: (resource) => {
    throw Error('This function is not yet implemented');
  },

  delete: (resource) => {
    throw Error('This function is not yet implemented');
  },

  deleteMany: (resource, params) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    return httpClient(`${adminApiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
    }).then(() => ({ data: [] }));
  },
};

export default dataProvider;
