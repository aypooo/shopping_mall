import { useRecoilValue } from "recoil"
import { checkedCartState } from "../../recoils/cart"
import ItemData from "./ItemData"
import { Link, useNavigate } from "react-router-dom"

const WillPay = () => {
    const navigate = useNavigate()
    const checkedItems = useRecoilValue(checkedCartState)
    const totalPrice = checkedItems.reduce((res,{ price, amount }) =>{
        res += price * amount;
        return res
    }, 0)
    const handleSubmit = () => {
        if(checkedItems.length) {
            navigate('/payment')
        }else {
            alert("결제할 상품을 선택해주세요.")
        }
    }
    return (
        <div className="cart-willpay">
            <ul>
                {checkedItems.map(({imageUrl, price, title,amount, id}) => (
                    <li>
                        <ItemData imageUrl={imageUrl} price={price} title={title} key={id}/>
                        <p>수량: {amount}</p>
                        <p>금액: {price * amount}</p>
                    </li>
                ))}
            </ul>
            <p>총예상결제액: {totalPrice} </p>
            <button onClick={handleSubmit}>결제하기</button>
        </div>
    )
}

export default WillPay