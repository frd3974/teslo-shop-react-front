import {CustomJumbotron} from "@/shop/components/CustomJumbotron.tsx";
import {ProductsGrid} from "@/shop/components/ProductsGrid.tsx";
import {CustomPagination} from "@/components/custom/CustomPagination.tsx";
import {useParams} from "react-router";
import {useProducts} from "@/shop/hooks/useProducts.tsx";

export const GenderPage = () => {
    const {gender} = useParams();
    const genderLabel = gender == 'men' ? 'Hombres' : gender == 'women' ? 'Mujeres' : 'Niños';
    const {data} = useProducts();
    return (
        <>
            <CustomJumbotron title={`Productos para ${genderLabel}`}/>
            <ProductsGrid products={data?.products ?? []}/>
            <CustomPagination totalPages={data?.pages ?? 0}/>
        </>
    );
};