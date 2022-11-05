import { useState } from 'react'

const ItemCount = ({stock = 0, initial = 1, onAdd})=> {
    const [quantity, setQuantity] = useState(initial)
 
    const increment = () => {
         for(var i = 0; i < 1; i++) {
             setQuantity(valorPrev => valorPrev + 1)
         }
 
    }
 
    const decrement = () => {
        if(quantity > 1) {
            setQuantity(quantity - 1)
        }     
    }
 
    return(
        <div className='Counter'>          
             <div className='Controls'>
                 <button className="btn btn-primary" onClick={decrement}>-</button>
                 <h4 className='Number'>{quantity}</h4>
                 <button className="btn btn-primary" onClick={increment}>+</button>
             </div>
             <br></br>
             <div>
                 <button className="btn btn-primary" onClick={() => onAdd(quantity)}>Agregar al carrito</button>
             </div>
        </div>
    )
 
 }
 export default ItemCount