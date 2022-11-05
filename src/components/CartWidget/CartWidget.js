import cart from "./assets/cart.png"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext);

    return ( 
        <div>
        
        <h2><img src={cart} alt="cart" />{totalQuantity}</h2>
        </div>
        
    )
}

export default CartWidget