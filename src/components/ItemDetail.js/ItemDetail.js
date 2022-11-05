import ItemCount from '../ItemCount/ItemCount'
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext' 

const ItemDetail = ({ id, name, img, description, price, stock }) => {
   
    const { addItem, getProductQuantity } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, description, quantity
        }

        addItem(productToAdd)
        
    }

    const quantityAdded = getProductQuantity(id)



    return ( 
        <div>
            
            <div>
                    <h2>{name}</h2>
                    <img src={img} alt="logo MegaFit-Sup"/>
                    <h3>Descripcion:{description}</h3>
                    <p>${price}</p>
                    <section>
                       {stock !== 0 ? <ItemCount onAdd={handleOnAdd} stock={stock} initial={quantityAdded}/>: <p>Sin stock</p>}
                    </section>
            </div>
        </div>

    )

}

export default ItemDetail