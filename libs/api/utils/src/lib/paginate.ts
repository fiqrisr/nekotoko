import { PageMetaDto } from '@nekotoko/api/shared/dto';

export function paginateArray<T = unknown>(
  array: T[],
  page: number,
  take: number
) {
  const offset = (page - 1) * take;
  const data = array.slice(offset).slice(0, take);

  return data;
}

export function paginateArrayWithMeta<T = unknown>(
  array: T[],
  page: number,
  take: number
): {
  data: T[];
  meta: PageMetaDto;
} {
  const itemCount = array.length;
  const pageCount = Math.ceil(itemCount / take);
  const offset = (page - 1) * take;
  const data = array.slice(offset).slice(0, take);

  return {
    data,
    meta: {
      page,
      take,
      itemCount,
      pageCount,
      hasPreviousPage: page > 1,
      hasNextPage: page < pageCount,
    },
  };
}
