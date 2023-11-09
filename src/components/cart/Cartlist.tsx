import React, { SyntheticEvent, createRef, useEffect, useRef, useState } from 'react';
import CartItem from './CartItem';
import { CartType} from '../../graphql/cart';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../recoils/cart';
import WillPay from '../willPay/WillPay';
import { useNavigate } from 'react-router-dom';

const Cartlist = ({items}: {items:CartType[]}) => {
    const navigate = useNavigate()
    const [CheckedCartData, setCheckedCartData] = useRecoilState(checkedCartState)
    const formRef = useRef<HTMLFormElement>(null)
    const checkboxRefs = items.map(() => createRef<HTMLInputElement>())
    const [formData, setFormData] = useState<FormData>()

    const setAllCheckedFromItems = () => {
        //개별아이템 선택시
        if(!formRef.current) return
        const data = new FormData(formRef.current)
        const selectedCount = data.getAll('select-item').length
        const allChecked = selectedCount === items.length
        formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked
    }
    const setItemsChckedFromAll = (targetInput: HTMLInputElement) => {
        const allChecked = targetInput.checked
        checkboxRefs.forEach(inputElem => {
            inputElem.current!.checked = allChecked

        })
    
    }
    const handleCheckboxChanged = (e: SyntheticEvent) => {
        if(!formRef.current) return
        const targetInput = e.target as HTMLInputElement
        if(targetInput.classList.contains('select-all')){
            setItemsChckedFromAll(targetInput)
        } else {
            setAllCheckedFromItems()
        }
        const data = new FormData(formRef.current)
        setFormData(data)
    }

    const handleSubmit = () => {
        if(CheckedCartData.length) {
            navigate('/payment')
        }else {
            alert("결제할 상품을 선택해주세요.")
        }
    }


    useEffect(() => {
        CheckedCartData.forEach(item => {
          const itemRef = checkboxRefs.find(ref => ref.current!.dataset.id === item.id)
          if(itemRef) itemRef.current!.checked = true
        })
        setAllCheckedFromItems()
    },[])

    useEffect(() => {
        const checkedItems = checkboxRefs.reduce<CartType[]>((res, ref, i) => {
            if(ref.current!.checked) res.push(items[i])
            return res
        },[])
        setCheckedCartData(checkedItems)
    }, [items,formData])
        
    return (
        <div>
        <form ref={formRef} onChange={handleCheckboxChanged}>
            <label>
                <input className='select-all' type="checkbox"/>
                전체선택
            </label>
            <ul className='cart'>
                {items.map((item ,i) => <CartItem {...item} key={item.id} ref={checkboxRefs[i]}/>)} 
            </ul>
        </form>
            <WillPay submitTitle="결제창으로" handleSubmit={handleSubmit}/>
        </div>
    )
    }
export default Cartlist;