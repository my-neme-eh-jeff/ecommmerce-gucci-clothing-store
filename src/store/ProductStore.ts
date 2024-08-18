import create from 'zustand';
import { debounce } from 'lodash';
import { fuzzy } from 'fast-fuzzy';

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    imageUrl: string;
    category: string;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

interface ProductStore {
    products: Product[];
    filteredProducts: Product[];
    searchTerm: string;
    setProducts: (products: Product[]) => void;
    setSearchTerm: (searchTerm: string) => void;
}

const useProductStore = create<ProductStore>((set, get) => ({
    products: [],
    filteredProducts: [],
    searchTerm: '',
    setProducts: (products) => set({ products, filteredProducts: products }),
    setSearchTerm: debounce((searchTerm: string) => {
        set({ searchTerm });
        const { products } = get();
        const filtered = products.filter((product) =>
            fuzzy(searchTerm, product.name, { ignoreCase: true }) > 0.6
        );
        set({ filteredProducts: filtered });
    }, 500),
}));

export default useProductStore;