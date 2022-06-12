import { createContext } from 'react';

interface ProuctSearchContextType {
  search: string;
  setSearch?: (search: string) => void;
}

export const ProductSearchContext = createContext<ProuctSearchContextType>({
  search: '',
});
