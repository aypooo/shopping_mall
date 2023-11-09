import { useRecoilState } from "recoil"
import { checkedCartState } from "../../recoils/cart"
import Payment from "../../components/payment/Payment"

const PaymentPage = () => {
    const [CheckedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    return (
        <>
            <Payment></Payment>
        </>
    )
}

export default PaymentPage