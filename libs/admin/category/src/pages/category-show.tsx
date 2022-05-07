import { useShow, useOne } from '@pankod/refine-core';
import { Show, Typography } from '@pankod/refine-antd';
import { ShowCategoryResponse } from '@nekotoko/admin/types';

const { Title, Text } = Typography;

export const CategoryShow = () => {
  const { queryResult } = useShow<ShowCategoryResponse>();
  const { data, isLoading } = queryResult;
  const record = data?.data.data.category;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>
    </Show>
  );
};
