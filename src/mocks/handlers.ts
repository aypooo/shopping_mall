import { HttpResponse, graphql } from 'msw'
import { v4 as uuid } from 'uuid'
import { GET_PRODUCT, GET_PRODUCTS } from '../graphql/products'
import { ADD_CART, CartType, GET_CART, UPDATE_CART } from '../graphql/cart'

const mockProducts = Array.from({ length: 20}).map(
    (_, i) => ({
        id: i + 1 + "",
        imageUrl: `https://placehold.co/200x150`,
        price: 50000,
        title: `임시상품${i+1}`,
        description: `임시상세내용${i+1}`,
        createdAt: new Date(1645735501883+(i*1000*60*60)).toString()
    })
)
let cartData: { [key: string]: CartType } = (() => ({}))()

export const handlers = [
    graphql.query(GET_PRODUCTS, () => {
        return HttpResponse.json({
            data: {
                products: mockProducts,
            }
        })
    }),
    graphql.query(GET_PRODUCT, ({variables}) => {
        const found = mockProducts.find(item => item.id === variables.id)
        if(found) return HttpResponse.json({
            data: {
                products: mockProducts[variables.id],
            }
        })
        return 

    }),
    graphql.query(GET_CART, () => {
        return HttpResponse.json({
            data: cartData,
        })
    }),
    graphql.mutation(ADD_CART, ({variables}) => {
        const newData = {...cartData}
        const id = variables.id
        if(newData[id]){
            newData[id] = {
                ...newData[id],
                amount: (newData[id].amount || 0) + 1
            }
        } else {
            const found = mockProducts.find(item => item.id === variables.id)
            if(found) {
                newData[id] = {
                    ...found,
                    amount: 1,
            }
            }
        }
        cartData = newData
        console.log(cartData[id].id,"->",cartData[id].amount)
        return HttpResponse.json({
            data: cartData,
        })
    }),
    graphql.mutation(UPDATE_CART, ({variables}) => {
        const newData = {...cartData}
        const { id, amount } = variables
        if(!newData[id]){ throw new Error('없는 데이터입니다')}
        newData[id] = {
            ...newData[id],
            amount,
        }
        cartData = newData
        console.log(cartData[id].id,"->",cartData[id].amount)
        return HttpResponse.json({
            data: cartData,
        })
    }),
        
]