import { useState, useEffect, createContext } from "react"
import Swal from "sweetalert2"

export const CartContext = createContext({
    cart: [],
    totalQuantity: 0
})

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState([])
    const [totalQuantity, setTotalQuantity] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const totalQty = getQuantity()
        setTotalQuantity(totalQty)
    }, [cart]) 

    useEffect(() => {
        const total = getTotal()
        setTotal(total)
      }, [cart]) 

      const addItem= (productToAdd) => {
        if (!isInCart(productToAdd.id)){
            setCart([...cart, productToAdd]);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
              })
        } else {
            setCart(
                cart.map((prod) => {
                    return prod.id === productToAdd.id
                        ? { ...prod, quantity: productToAdd.quantity }
                        : prod;
                })
            );
           
        }
    }
    const isInCart = (id) => {
        return cart.some(prod => prod.id === id)
    }

    const removeItem = (id) => {
        const cartWithoutProduct = cart.filter(prod => prod.id !== id)
        setCart(cartWithoutProduct)
    }

    const getQuantity = () => {
        let accu = 0

        cart.forEach(prod => {
            accu += prod.quantity
        })

        return accu
    }

    const getTotal = () => {
        let accu = 0
  
        cart.forEach(prod => {
            accu += prod.quantity * prod.price
        })
  
        return accu
    }
    
    const clearCart = () => {
      setCart ([])
    }

    const getProductQuantity = (id)=>{
      const product= cart.find(prod=> prod.id === id )
      
        return product?.quantity
      
      
    }

    return (
        <CartContext.Provider value={{ cart, addItem, removeItem, isInCart, totalQuantity, total, clearCart, getProductQuantity}}>
            {children}
        </CartContext.Provider>
    )
}