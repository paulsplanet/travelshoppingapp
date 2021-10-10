import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getCartItems, removeCartItem } from "../../../_actions/user_actions";
import UserCardBlock from "./Sections/UserCardBlock";
import { Empty } from "antd";
import Paypal from "../../utils/Paypal";

function CartPage (props) {
    const [total, setTotal] = useState(0);
    const [showTotal, setShowTotal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        let cartItems = [];

        if(props.user.userData && props.user.userData.cart) {
            if(props.user.userData.cart.length > 0) {
                props.user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })

                dispatch(getCartItems(cartItems, props.user.userData.cart))
                    .then(response => { calculateTotal(response.payload) })
            }
        }
    }, [props.user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0;
        cartDetail.map(item => {
            total += parseInt(item.price, 10) * item.quantity
        })
        setTotal(total);
        setShowTotal(true)
    }

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
            .then(response => {
                if(response.payload.productInfo.length <= 0) {
                    setShowTotal(false)
                }
            })
    }


    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h1>My Cart</h1>
            <div>
               <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart} /> 
            </div>

            {showTotal ? 
                <div style={{ marginTop: '3rem' }}>
                    <h2>Total Amount: ${total}</h2>
                </div> :
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3rem' }}>
                    <br />
                    <Empty description={false} />
                    <h3 style={{ color: '#888' }}>No Items in the Cart</h3>
                </div>
            }

            <Paypal />
        </div>
    )
}

export default CartPage;