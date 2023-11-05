import { gql } from 'graphql-tag'

export type Product = {
    map(arg0: () => void): unknown
    id: string
    imageUrl: string
    price: number
    title: string
    description: string
    createdAt: string
}
export type Products = {
    products: Product[]
}

export const GET_PRODUCTS = gql`
    query GET_PEODUCTS {
        id
        imageUrl
        price
        title
        description
        createdAt
    }
` 

export const GET_PRODUCT = gql`
    query GET_PEODUCT($id: string) {
        id
        imageUrl
        price
        title
        description
        createdAt
    }
` 


