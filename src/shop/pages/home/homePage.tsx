import {CustomJumbotron} from "@/shop/components/CustomJumbotron.tsx";
import {CustomPagination} from "@/components/custom/CustomPagination.tsx";
import {ProductsGrid} from "@/shop/components/ProductsGrid.tsx";
import {useProducts} from "@/shop/hooks/useProducts.tsx";

export const HomePage = () => {
    const {data} = useProducts();
    return (
        <>
            <CustomJumbotron title='Todos los productos'/>
            <ProductsGrid products={data?.products ?? []}/>
            <CustomPagination totalPages={data?.pages ?? 0}/>
        </>
    );
};