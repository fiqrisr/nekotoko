import React from 'react';
import { useResource, LayoutProps } from '@pankod/refine-core';
import { AppShell } from '@mantine/core';
import { Header } from '@nekotoko/pos/components';

export const MainLayout = ({
  children,
}: React.PropsWithChildren<LayoutProps>) => {
  const { resources } = useResource();

  return <AppShell header={<Header links={resources} />}>{children}</AppShell>;
};
