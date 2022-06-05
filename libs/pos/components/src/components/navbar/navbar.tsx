import { IResourceItem, useLogout } from '@pankod/refine-core';
import { createStyles, Navbar as MantineNavbar, Anchor } from '@mantine/core';
import { Logout } from 'tabler-icons-react';

import { MainLink } from './main-link';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === 'dark'
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === 'dark' ? 5 : 7
            ],
        },
      },
    },
  };
});

export const Navbar = ({ resources }: { resources: IResourceItem[] }) => {
  const { classes } = useStyles();
  const { mutate: logout } = useLogout();

  const links = resources.map((item) => <MainLink item={item} />);

  return (
    <MantineNavbar width={{ sm: 300 }} p="md">
      <MantineNavbar.Section grow>{links}</MantineNavbar.Section>

      <MantineNavbar.Section className={classes.footer}>
        <Anchor className={classes.link} onClick={() => logout()}>
          <Logout className={classes.linkIcon} />
          <span>Logout</span>
        </Anchor>
      </MantineNavbar.Section>
    </MantineNavbar>
  );
};
