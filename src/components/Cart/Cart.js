import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
const Cart = () => {

    const {cart, removeItem, total, clearCart} = useContext(CartContext)

    return(
        <div>
            <h2>Tu Orden:</h2>
            {
                cart.map(prod =>(
                    <div>
                        <h2>{prod.name}</h2>
                        <h2>{prod.description}</h2>
                        <h3>Precio Unitario ${prod.price}</h3>
                        <h3>Cantidad:{prod.quantity}</h3>   
                        <button onClick={()=>removeItem(prod.id)}>Remover</button>
                    </div>
                ))
            }
            <div>
            <h2>Total:${total}</h2>
            <button onClick={()=> clearCart()}>Vaciar Carrito</button>
            <Link to='/checkout'><button>Continuar Compra</button></Link>


            </div>
        </div>    
    )
}


export default Cart