import { useShow } from '@pankod/refine-core';
import { Show, Typography, TagField } from '@pankod/refine-antd';
import { User } from '@nekotoko/db-monolithic';

const { Title, Text } = Typography;

export const UserShow = () => {
  const { queryResult } = useShow<User>();
  const { data, isLoading } = queryResult;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Username</Title>
      <Text>{data?.data.username}</Text>

      <Title level={5}>Full Name</Title>
      <Text>{data?.data.full_name}</Text>

      <Title level={5}>Roles</Title>
      {data?.data.roles.map((role) => (
        <TagField key={role} value={role} />
      ))}
    </Show>
  );
};
