import { gql } from 'graphql-tag'

export type CartType = {
    id: string
    imageUrl: string
    price: number
    title: string
    amount: number
}

export const ADD_CART = gql`
    mutation ADD_CART($id: string) {
        cart(id: $id){
        id
        imageUrl
        price
        title
        amount
    }
}
`
export const UPDATE_CART = gql`
    mutation UPDATE_CART($id: sting $amount: number) {
        cart(id: $id){
        id
        imageUrl
        price
        title
        amount
    }
}
`

export const GET_CART = gql`
    query GET_CART {
        id
        imageUrl
        price
        title
        amount
    }
`

export const DELETE_CART = gql`
    mutation DELETE_CART($id: sting) {
        id
    }
`

