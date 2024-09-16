import http from './http-common';

export enum ProductState {
  GOOD = "GOOD",
  AVERAGE = "AVERAGE",
  BAD = "BAD"
}

type ResponseBackendProduct = {
  id: string;
  title: string;
  description: string;
}

export class ProductViewModel {
  id: string;
  title: string;
  description: string;
  price: number;
  state: ProductState;

  constructor(args: {
    id: string;
    title: string;
    description: string;
    price?: number;
    state?: ProductState;
  }) {
    this.id = args.id;
    this.title = args.title;
    this.description = args.description;
    this.price = args.price || 0;
    this.state = args.state || ProductState.GOOD;
  }
}

const mapProduct = (data: ResponseBackendProduct): ProductViewModel => {
  return new ProductViewModel(data);
}

type GetAllProductsResponse = {
  products: ProductViewModel[],
  currentPage: number,
  totalItems: number,
  totalPages: number
}

export const getAllProducts = async (page = 1, size = 10): Promise<GetAllProductsResponse> => {
  const response = await http.get<{
    data: ResponseBackendProduct[],
    currentPage: number,
    totalItems: number,
    totalPages: number
  }>(`/products?page=${page}&size=${size}`);
  return {
    ...response.data,
    products: response.data.data.map(mapProduct),
  };
}

export const getProduct = async (id: string): Promise<ProductViewModel>  => {
  const response = await http.get(`/products/${id}`);
  return mapProduct(response.data);
}

export const createProduct = async (data: Pick<ProductViewModel, 'title'|'description'|'price'|'state'>): Promise<ProductViewModel> => {
  const response = await http.post("/products", data);
  return mapProduct(response.data);
}

export const updateProduct = async (id: string, data: ProductViewModel): Promise<ProductViewModel> => {
  const response = await http.put(`/products/${id}`, data);
  return mapProduct(response.data);
}

export const deleteProduct = async (id: string): Promise<void> => {
  await http.delete(`/products/${id}`);
}

export const findProductByTitle = async (title: string, page = 1, size = 10): Promise<GetAllProductsResponse>  => {
  const response = await http.get<{
    data: ResponseBackendProduct[],
    currentPage: number,
    totalItems: number,
    totalPages: number
  }>(`/products?page=${page}&size=${size}&title=${title}`);
  return {
    ...response.data,
    products: response.data.data.map(mapProduct),
  };
}
