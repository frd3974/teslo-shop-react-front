import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getProductByIdAction} from "@/admin/actions/get-product-by-id.action.ts";
import type {Product} from "@/interfaces/product.interface.ts";
import {createUpdateProductAction} from "@/admin/actions/create-update-product.action.ts";

export const useProduct = (id:string) => {

    const queryClient = useQueryClient();

    const query = useQuery({
        queryKey: ['product', {id}],
        queryFn: () => getProductByIdAction(id),
        retry: false,
        staleTime: 100 * 60 * 5
    });

    const mutation = useMutation({
        mutationFn: createUpdateProductAction,
        onSuccess: (product:Product) => {
            console.log("todo ok");
            // invalidar cache
            queryClient.invalidateQueries({queryKey:['products']});
            queryClient.invalidateQueries({queryKey:['product', {id:product.id}]});

            //actualizar querydata
            queryClient.setQueryData(['product', {id:product.id}], product);
        }
    });

    // const handleSubmitForm = async (productLike: Partial<Product>) => {
    //     console.log({productLike})
    // }

    return {
        ...query,
        mutation
    }
};