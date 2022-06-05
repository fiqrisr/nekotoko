import { AxiosInstance } from 'axios';
import { stringify } from 'query-string';
import {
  DataProvider,
  HttpError,
  CrudOperators,
  CrudFilters,
  CrudSorting,
} from '@pankod/refine-core';
import { httpClient as axiosInstance } from '@nekotoko/admin/http';

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = '';

    if (error.response) {
      if (Array.isArray(error.response.data.message))
        message = error.response.data?.message.join(', ');
      else message = error.response.data?.error || error.response.data?.message;
    }

    const customError: HttpError = {
      ...error,
      message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

const mapOperator = (operator: CrudOperators): string => {
  switch (operator) {
    case 'ne':
    case 'gte':
    case 'lte':
      return `_${operator}`;
    case 'contains':
      return '_like';
    case 'eq':
    default:
      return '';
  }
};

const generateSort = (sort?: CrudSorting) => {
  if (sort && sort.length > 0) {
    const _sort: string[] = [];
    const _order: string[] = [];

    sort.map((item) => {
      _sort.push(item.field);
      _order.push(item.order);
    });

    return {
      _sort,
      _order,
    };
  }

  return;
};

const generateFilter = (filters?: CrudFilters) => {
  const queryFilters: { [key: string]: string } = {};
  if (filters) {
    filters.map((filter) => {
      if (filter.operator !== 'or') {
        const { field, operator, value } = filter;

        if (field === 'q') {
          queryFilters[field] = value;
          return;
        }

        const mappedOperator = mapOperator(operator);
        queryFilters[`${field}${mappedOperator}`] = value;
      }
    });
  }

  return queryFilters;
};

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance = axiosInstance
): DataProvider => ({
  getList: async ({ resource, pagination, filters, sort }) => {
    const url = `${apiUrl}/${resource}`;

    // pagination
    const current = pagination?.current || 1;
    const pageSize = pagination?.pageSize || 10;

    const queryFilters = generateFilter(filters);

    const query: {
      page: number;
      take: number;
      sort?: string;
      order?: string;
    } = {
      take: pageSize,
      page: current,
    };

    const generatedSort = generateSort(sort);

    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query.sort = _sort.join(',');
      query.order = _order.join(',');
    }

    const { data } = await httpClient.get(
      `${url}?${stringify(query)}&${stringify(queryFilters)}`
    );

    return {
      data: data && data.data[Object.keys(data.data)[0]],
      total: data && data.data.meta.itemCount,
    };
  },

  getMany: async ({ resource, ids }) => {
    const { data } = await httpClient.get(
      `${apiUrl}/${resource}?${stringify({ id: ids })}`
    );

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;

    const { data } = await httpClient.post(url, variables);

    return {
      data: data && data.data[Object.keys(data.data)[0]],
    };
  },

  createMany: async ({ resource, variables }) => {
    const response = await Promise.all(
      variables.map(async (param) => {
        const { data } = await httpClient.post(`${apiUrl}/${resource}`, param);
        return data;
      })
    );

    return { data: response };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.patch(url, variables);

    return {
      data: data && data.data[Object.keys(data.data)[0]],
    };
  },

  updateMany: async ({ resource, ids, variables }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.patch(
          `${apiUrl}/${resource}/${id}`,
          variables
        );
        return data;
      })
    );

    return { data: response };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.get(url);

    return {
      data: data && data.data[Object.keys(data.data)[0]],
    };
  },

  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;

    const { data } = await httpClient.delete(url, variables);

    return {
      data: data && data.data[Object.keys(data.data)[0]],
    };
  },

  deleteMany: async ({ resource, ids, variables }) => {
    const response = await Promise.all(
      ids.map(async (id) => {
        const { data } = await httpClient.delete(
          `${apiUrl}/${resource}/${id}`,
          variables
        );
        return data;
      })
    );
    return { data: response };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({ url, method, filters, sort, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sort) {
      const generatedSort = generateSort(sort);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(','),
          _order: _order.join(','),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    if (headers) {
      httpClient.defaults.headers = {
        ...httpClient.defaults.headers,
        ...headers,
      };
    }

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](url, payload);
        break;
      case 'delete':
        axiosResponse = await httpClient.delete(url);
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl);
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});

export default dataProvider;
