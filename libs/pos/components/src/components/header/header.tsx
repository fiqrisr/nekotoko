import {
  IResourceItem,
  useLogout,
  userFriendlyResourceName,
  useRouterContext,
} from '@pankod/refine-core';
import {
  createStyles,
  Header as MantineHeader,
  Container,
  Group,
  Burger,
  Text,
  Anchor,
  Menu,
  UnstyledButton,
  Avatar,
} from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { ChevronDown, Logout } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  title: {
    textDecoration: 'none',
    color: theme.colors.dark[7],
    flex: 1,
    fontFamily: `Poppins, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },

  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

const HeaderLink = ({ item }: { item: IResourceItem }) => {
  const { Link } = useRouterContext();
  const { classes, cx } = useStyles();

  const itemLabel =
    item.label ??
    userFriendlyResourceName(
      item.name,
      item.name !== 'dashboard' ? 'plural' : 'singular'
    );

  return (
    <Anchor
      component={Link}
      href={item.route}
      to={item.route}
      className={cx(classes.link)}
    >
      {itemLabel}
    </Anchor>
  );
};

export const Header = ({ links }: { links: IResourceItem[] }) => {
  const { Link } = useRouterContext();
  const { classes, cx } = useStyles();
  const { mutate: logout } = useLogout();
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [userMenuOpened, setUserMenuOpened] = useBooleanToggle(false);

  const items = links.map((link) => <HeaderLink key={link.key} item={link} />);

  return (
    <MantineHeader height={60} mb={10}>
      <Container className={classes.header}>
        <Anchor component={Link} to="/" className={classes.title}>
          <Text
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan', deg: 45 }}
            size="xl"
          >
            NekoToko POS
          </Text>
        </Anchor>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger
          opened={opened}
          onClick={() => toggleOpened()}
          className={classes.burger}
          size="sm"
        />

        <Menu
          onClose={() => setUserMenuOpened(false)}
          onOpen={() => setUserMenuOpened(true)}
          control={
            <UnstyledButton
              className={cx(classes.user, {
                [classes.userActive]: userMenuOpened,
              })}
            >
              <Group spacing={7}>
                <Avatar alt="user menu" radius="xl" />
                <ChevronDown size={12} />
              </Group>
            </UnstyledButton>
          }
        >
          <Menu.Item icon={<Logout size={14} />} onClick={() => logout()}>
            Logout
          </Menu.Item>
        </Menu>
      </Container>
    </MantineHeader>
  );
};
