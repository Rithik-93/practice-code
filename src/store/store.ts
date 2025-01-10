import { create } from 'zustand';

interface User {
  id: string | null;
  name: string;
  isLoggedIn: boolean;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

interface Order {
  id: string;
  items: CartItem[]; // Corrected from `item` to `items`
  status: boolean;
}

interface useStoreProps {
  user: User;
  login: (id: string, name: string) => void;
  logout: () => void;

  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  products: Product[];
  fetchProducts: () => Promise<void>;

  cart: CartItem[]
  addToCart: (product: Product) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  removeFromCart: (id: number) => void;

  orders: Order[]; 
  placeOrder: () => void;
}

const useStore = create<useStoreProps>()(
  (set, get) => ({
    user: {
      id: null,
      name: '',
      isLoggedIn: false,
    },
    login: (id, name) => set({ user: { id, name, isLoggedIn: true } }),
    logout: () => set({ user: { id: null, name: '', isLoggedIn: false } }),

    products: [],
    fetchProducts: async () => {
      const response = await fetch('/api/products');
      const data: Product[] = await response.json();
      set({ products: data });
    },

    cart: [],
    addToCart: (product) =>
      set((state) => ({
        cart: [...state.cart, { ...product, quantity: 1 }],
      })),
    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter((item) => item.id !== id),
      })),
    updateCartQuantity: (id, quantity) =>
      set((state) => ({
        cart: state.cart.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      })),

    orders: [],
    placeOrder: () => {
      const { cart, orders } = get();
      const newOrder: Order = {
        id: Date.now().toString(),
        items: cart,
        status: false,
      };
      set({
        orders: [...orders, newOrder],
        cart: [],
      });
    },

    isSidebarOpen: false,
    toggleSidebar: () =>
      set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  })
);

export default useStore;
