import React from 'react';
import { useParams } from 'react-router-dom';
import { QueryKeys, graphqlFetcher } from '../../queryClient';
import { useQuery } from 'react-query';
import ProductDetail from '../../components/product/detail';
import { GET_PRODUCT, Product } from '../../graphql/products';

const ProductsDetailPage = () => {
    const { id } = useParams()
    const { data } = useQuery<Product>([QueryKeys.PRODUCTS,id],
    () =>  graphqlFetcher<Product>(GET_PRODUCT, { id }), 
    )
    if (!data) return null;
    console.log(data)
    return (
       <ProductDetail item={data}/>
    );
};

export default ProductsDetailPage;



