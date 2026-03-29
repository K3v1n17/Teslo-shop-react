import { CustomPagination } from '@/components/custom/CustomPagination'
import { CustomJumbotron } from '@/shop/components/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/ProductsGrid'
import { useProduct } from '@/shop/hooks/useProduct'

export const HomePage = () => {

    const { data } = useProduct()

    //  console.log({data})

    return <>
        <CustomJumbotron title={'Todos los productos'} subTitle={''} />
        <ProductsGrid products={data?.products || []} />
        <CustomPagination totalPages={data?.pages || 0} />
    </>


}
