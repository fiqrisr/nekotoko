import { Title, Container, SimpleGrid } from '@mantine/core';
import { Stat, StatProps } from '@nekotoko/pos/components';

const data: StatProps[] = [
  {
    label: 'Page views',
    stats: '456,578',
    progress: 65,
    color: 'teal',
    icon: 'up',
  },
  {
    label: 'New users',
    stats: '2,550',
    progress: 72,
    color: 'blue',
    icon: 'up',
  },
  {
    label: 'Orders',
    stats: '4,735',
    progress: 52,
    color: 'red',
    icon: 'down',
  },
];

export const DashboardPage = () => {
  return (
    <Container>
      <Title mb={20}>Dashboard</Title>
      <SimpleGrid cols={3} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {data.map((s) => (
          <Stat {...s} />
        ))}
      </SimpleGrid>
    </Container>
  );
};
