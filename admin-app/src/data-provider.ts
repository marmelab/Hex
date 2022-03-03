import { fetchUtils, Options } from 'react-admin';
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

export default {
  getList: (resource: string, params: any) => {
    console.log(params);
    const query = {
      s: {
        skip: (params.pagination.page - 1) * params.pagination.perPage,
        take: params.pagination.perPage,
        sort: [{ column: params.sort.field, order: params.sort.order }],
        filter: Object.keys(params.filter).map((key) => ({
          column: key,
          value: params.filter[key],
        })),
      },
    };
    console.log(JSON.stringify(query));
    const url = `${adminApiUrl}/${resource}?${JSON.stringify(query)}`;

    return httpClient(url).then(({ json }) => ({
      data: json.data,
      total: json.total,
    }));
  },

  // getList: (resource, params) => {
  //   const { page, perPage } = params.pagination;
  //   const { field, order } = params.sort;
  //   const query = {
  //     sort: JSON.stringify([field, order]),
  //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
  //     filter: JSON.stringify(params.filter),
  //   };
  //   const url = `${apiUrl}/${resource}?${stringify(query)}`;

  //   return httpClient(url).then(({ headers, json }) => ({
  //     data: json,
  //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
  //   }));
  // },

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

  deleteMany: (resource: string, params: { ids: number[] }) => {
    const query = {
      ids: JSON.stringify(params.ids),
    };
    return httpClient(`${adminApiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
    }).then(({ json }) => ({ data: json }));
  },
};
