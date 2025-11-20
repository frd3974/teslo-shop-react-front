import type {Product} from "@/interfaces/product.interface.ts";

export default interface ProductsResponse {
   count: number;
   pages: number;
   products: Product[];
}




