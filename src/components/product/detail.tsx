
import { Product } from '../../graphql/products';

const ProductDetail = ({item}: 
    {item: any}) => {
        const { imageUrl,price,description,title} = item.products
        console.log(item)
        console.log(imageUrl)
    return (
        <div className="product-detail">
            <h2>상품상세</h2>
                <p className="product-detail__title">{title}</p>
                <img className="product-detail__image" src={imageUrl}/>
                <p className="product-detail__description">{description}</p>
                <span className="product-detail__price">${price}</span>
        </div>
    );
};

export default ProductDetail;