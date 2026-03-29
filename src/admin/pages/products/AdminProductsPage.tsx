import { AdminTitle } from "@/admin/components/AdminTitle";
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/currency-formatter";
import { products } from "@/mocks/products.mocks";
import { useProduct } from "@/shop/hooks/useProduct";
import { PencilIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

export const AdminProductsPage = () => {

  const { data  , isLoading} = useProduct()

  if(isLoading) {
    return <CustomFullScreenLoading/>
  }


  return (
    <>
      <div className="flex justify-between items-center">
        <AdminTitle
          title="Productos"
          subtitle="Aqui puedes ver y administrar tus productos"
        />

        <div className="flex justify-end mb-10 gap-4">
          <Link to={"/admin/products/new"}>
            <Button>
              <PlusIcon />
              Nuevo Producto
            </Button>
          </Link>
        </div>
      </div>

      <Table className="bg-white shadow-xs border border-gray-200 mb-10 rounded-xl overflow-hidden">
        <TableHeader>
          <TableRow>
            <TableHead>Imagen </TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Tallas</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>


        {/* poner un map e los productos  */}
        <TableBody>
          {data?.products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-20 h-20 object-cover rounded-md"
                />
              </TableCell>
              <TableCell>
                 <Link to={`/admin/products/${product.id}`} className="hover:text-blue-500 underline">{product.title} </Link>

              </TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.gender}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.sizes.join(', ')}</TableCell>
              <TableCell className="text-right">
                <Link to={`/admin/products/${product.id}`}>
                  <PencilIcon className="w-4 h-4 text-blue-500"/>
                </Link>
              </TableCell>
            </TableRow>
          ))}
          </TableBody>
     
      
      </Table>

      <CustomPagination totalPages={data?.pages || 0} />
    </>
  );
};
