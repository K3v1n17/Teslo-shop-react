import { CustomPagination } from '@/components/custom/CustomPagination'
import { CustomJumbotron } from '@/shop/components/CustomJumbotron'
import { ProductsGrid } from '@/shop/components/ProductsGrid'
import { useProduct } from '@/shop/hooks/useProduct'
import { useParams } from 'react-router'

export const GenderPage = () => {

    const {gender} = useParams()
    const {data} = useProduct()
    const genderLabel = gender === 'men' ? 'Hombres' : gender === 'women' ? 'Mujeres' : 'Niños' 


    return (
      <>
      <CustomJumbotron title={`Productos para ${genderLabel}`}  />
         <ProductsGrid products={data?.products || []}/>
        <CustomPagination totalPages={data?.pages || 0} />
      </>
    )
}
