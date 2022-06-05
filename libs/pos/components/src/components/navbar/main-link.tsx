import React from 'react';
import {
  useRouterContext,
  IResourceItem,
  userFriendlyResourceName,
} from '@pankod/refine-core';
import { ThemeIcon, UnstyledButton, Anchor, Group, Text } from '@mantine/core';
import { List } from 'tabler-icons-react';

export const MainLink = ({ item }: { item: IResourceItem }) => {
  const { Link } = useRouterContext();

  const itemLabel =
    item.label ??
    userFriendlyResourceName(
      item.name,
      item.name !== 'dashboard' ? 'plural' : 'singular'
    );

  return (
    <Anchor component={Link} href={item.route} to={item.route}>
      <UnstyledButton
        sx={(theme) => ({
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        })}
      >
        <Group>
          <ThemeIcon variant="light">
            {item.icon ?? <List size={18} />}
          </ThemeIcon>

          <Text size="sm">{itemLabel}</Text>
        </Group>
      </UnstyledButton>
    </Anchor>
  );
};
