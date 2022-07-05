import create from 'zustand';
import { combine } from 'zustand/middleware';

import { ProductStoreItemType } from '../types';

interface ProductStoreState {
  products: ProductStoreItemType[];
  totalPrice: number;
  totalItem: number;
  paidAmount: number;
}

interface ProductStoreActions {
  addProduct: (product: ProductStoreItemType) => void;
  removeProduct: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  setTotal?: (total: number) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  reset: () => void;
  setPaidAmount: (value: number) => void;
}

const initialState: ProductStoreState = {
  products: [],
  totalPrice: 0,
  totalItem: 0,
  paidAmount: 0,
};

export const useProductStore = create(
  combine<ProductStoreState, ProductStoreActions>(initialState, (set) => ({
    addProduct: (product: ProductStoreItemType) => {
      set((s) => {
        const itemExists = s.products.find((item) => item.id === product.id);

        if (itemExists) {
          itemExists.quantity += 1;
          itemExists.total = itemExists.quantity * itemExists.price;

          return {
            ...s,
            totalPrice: s.totalPrice + itemExists.price,
            totalItem: s.totalItem + 1,
          };
        }

        return {
          ...s,
          products: [...s.products, product],
          totalPrice: s.totalPrice + product.price,
          totalItem: s.totalItem + 1,
        };
      });
    },

    removeProduct: (id: string) => {
      set((s) => {
        const itemExists = s.products.find((item) => item.id === id);

        if (itemExists) {
          const newProducts = s.products.filter((item) => item.id !== id);

          return {
            ...s,
            products: newProducts,
            totalPrice: s.totalPrice - itemExists.price,
            totalItem: s.totalItem - 1,
          };
        }

        return s;
      });
    },

    setQuantity: (id: string, quantity: number) => {
      set((s) => {
        const itemExists = s.products.find((item) => item.id === id);

        if (itemExists) {
          itemExists.quantity = quantity;
          itemExists.total = itemExists.quantity * itemExists.price;

          return {
            ...s,
            totalPrice:
              s.totalPrice +
              itemExists.price * (quantity - itemExists.quantity),
            totalItem: s.totalItem + (quantity - itemExists.quantity),
          };
        }

        return s;
      });
    },

    incrementQuantity: (id: string) => {
      set((s) => {
        const item = s.products.find((item) => item.id === id);

        if (item) {
          item.quantity += 1;
          item.total = item.quantity * item.price;

          return {
            ...s,
            totalPrice: s.totalPrice + item.price,
            totalItem: s.totalItem + 1,
          };
        }

        return s;
      });
    },

    decrementQuantity: (id: string) => {
      set((s) => {
        const item = s.products.find((item) => item.id === id);

        if (item) {
          item.quantity -= 1;
          item.total = item.quantity * item.price;

          return {
            ...s,
            totalPrice: s.totalPrice - item.price,
            totalItem: s.totalItem - 1,
          };
        }

        return s;
      });
    },

    reset: () => {
      set(initialState);
    },

    setPaidAmount: (value: number) => set((s) => ({ paidAmount: value })),
  }))
);
