import { useContext } from 'react';
import { TextInput, ActionIcon } from '@mantine/core';
import { Search, X } from 'tabler-icons-react';

import { ProductSearchContext } from '../contexts';

export const ProductSearch = () => {
  const productSearchContext = useContext(ProductSearchContext);

  return (
    <TextInput
      icon={<Search size={18} />}
      radius="xl"
      size="md"
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color="gray"
          variant="filled"
          onClick={() => productSearchContext.setSearch('')}
        >
          <X size={18} />
        </ActionIcon>
      }
      placeholder="Search"
      rightSectionWidth={42}
      mb={12}
      value={productSearchContext.search}
      onChange={(v) => productSearchContext.setSearch(v.target.value)}
    />
  );
};
