import React from 'react';
import CartItem from './CartItem';
import { CartType} from '../../graphql/cart';

const Cartlist = ({items}: {items:CartType[]}) => {
    return (
        <ul >
           {items.map(item => <CartItem {...item} key={item.id}/>)} 
        </ul>
    )
    }
export default Cartlist;