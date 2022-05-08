import { useShow } from '@pankod/refine-core';
import { Show, Typography } from '@pankod/refine-antd';
import { Category } from '@nekotoko/admin/types';

const { Title, Text } = Typography;

export const CategoryShow = () => {
  const { queryResult } = useShow<Category>();
  const { data, isLoading } = queryResult;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{data?.data.name}</Text>
    </Show>
  );
};
