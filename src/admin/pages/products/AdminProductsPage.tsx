import {AdminTitle} from "@/admin/components/AdminTitle.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Link} from "react-router";
import {CustomPagination} from "@/components/custom/CustomPagination.tsx";
import {Button} from "@/components/ui/button.tsx";
import {PencilIcon, PlusIcon} from "lucide-react";
import {useProducts} from "@/shop/hooks/useProducts.tsx";

export const AdminProductsPage = () => {
    const {data} = useProducts();
    console.log({data});
    return (
        <>
            <div className='flex justify-between items-center'>
                <AdminTitle title='Productos' subtitle='Aquí puedes ver y administrar tus productos'/>
                <div className="flex justify-end mb-10 gap-4">
                    <Link to='/admin/products/new'>
                        <Button>
                            <PlusIcon/>
                            Nuevo producto
                        </Button>
                    </Link>
                </div>
            </div>

            <Table className='bg-white p-10 shadow-xs border-gray-200 mb-10'>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Imagen</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Inventario</TableHead>
                        <TableHead>Tallas</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data?.products && data.products.map((product, idx) => (
                            <TableRow key={product.id}>
                                <TableCell className="font-medium">{idx + 1}</TableCell>
                                <TableCell>
                                    <img
                                        src={product.images[0]}
                                        alt='Product'
                                        className='w-20 h-20 object-cover rounded-md'
                                    />
                                </TableCell>
                                <TableCell>
                                    <Link className='hover:text-blue-500 underline' to={`/admin/products/${product.id}`}>
                                        {product.title}
                                    </Link>
                                </TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell>{product.gender}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell>{product.sizes.join(', ')}</TableCell>
                                <TableCell className="text-right">
                                    <Link to={`/admin/products/${product.id}`}>
                                        <PencilIcon className='w-4 h-4 text-blue-500' />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </Table>

            <CustomPagination totalPages={data?.pages ?? 0}/>
        </>
    );
};