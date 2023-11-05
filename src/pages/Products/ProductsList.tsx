import { QueryKeys, graphqlFetcher} from '../../queryClient';
import { useQuery } from 'react-query';
import { ProductItem } from '../../components/product/item';
import '../../scss/index.scss'
import { GET_PRODUCTS, Products } from '../../graphql/products';

const ProductsList = () => {
    const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher<Products>(GET_PRODUCTS)
  )
    return (
        <div>
            <h2>상품목록</h2>
            <ul className='products'>
                {data?.products?.map(product => (
                 <ProductItem {...product} key={product.id}/> 
                ))}
            </ul>
        </div>
    );
};

export default ProductsList;