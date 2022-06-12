import React from 'react';
import { useResource, LayoutProps } from '@pankod/refine-core';
import { AppShell, createStyles } from '@mantine/core';
import { Header } from '@nekotoko/pos/components';

const useStyles = createStyles(() => ({
  appShell: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',

    '> div': {
      flex: 1,
    },
  },
}));

export const MainLayout = ({
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  const { resources } = useResource();
  const { classes } = useStyles();

  return (
    <AppShell
      className={classes.appShell}
      header={<Header links={resources} />}
    >
      {children}
    </AppShell>
  );
};
