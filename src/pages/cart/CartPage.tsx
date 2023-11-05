import React from 'react';
import { QueryKeys, graphqlFetcher } from '../../queryClient';
import { useQuery } from 'react-query';
import { Product } from '../../graphql/products';
import { CartType, GET_CART } from '../../graphql/cart';
import Cartlist from '../../components/cart/Cartlist';


const CartPage = () => {
    const { data } = useQuery(QueryKeys.CART, () =>
        graphqlFetcher(GET_CART),{
            staleTime: 0,
            cacheTime: 1000,
        })
        // console.log( Object.values(data as Cart))

    const cartItems = Object.values(data || {} ) as CartType[]
    if(!cartItems.length) return <div>장바구니가 비었어요</div>
    console.log(cartItems)
    // return <></>
    return <Cartlist items={cartItems}/>
};

export default CartPage;