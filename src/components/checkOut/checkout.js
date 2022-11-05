import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { collection, getDocs, query, where, documentId, writeBatch, addDoc, } from "firebase/firestore"
import { db } from "../../services/firebase";
import ClientForm from "../Form/Form";

const Checkout = () => {

    const [loading, setLoading] = useState(false)

    const [personalData, setPersonalData] = useState(false)
    
            const [datosCompra, setDatosCompra] = useState({}) 

    const completoDatos = (name, surname, address, phone, email) =>{
            setDatosCompra({name, surname, address, phone, email})
            setPersonalData(true)
        }

    const { cart, total } = useContext(CartContext)

    const createOrder = async () => {

        setLoading(true)

        try {
            const objOrder = {
                buyer: {
                    name: "jorge rod",
                    phone: "341587896",
                    mail: "jorgero@hotmail.com"
                },
        
                item: cart,
                total: total
            }

            const batch = writeBatch(db)

            const outOfStock = []
    
            const ids = cart.map(prod => prod.id)
    
            const productsRef = collection(db, 'products')
    
            const productsAddedFromFirestore = await getDocs(query(productsRef, where(documentId(), 'in', ids)))

            const { docs } = productsAddedFromFirestore

            docs.forEach(doc=>{
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart?.quantity

                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })

                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc})
                }
            })

            if(outOfStock.length === 0) {
                await batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, objOrder)

                console.log(`El id de su orden es: ${orderAdded.id}`)
            } else {
                console.log("Algunos productos no se encuentran en stock")
            }
            
        } catch (error) {
            console.log(error)
        }  finally {
            setLoading(false)
        }

        if(loading) {
            return <h1>Se esta generando su pedido...</h1>
                    
        }
        

    }

    
    return (
        <div>    
            <h2>Checkout de tu Compra</h2>
            <br></br>
            <h3>Completa con tus datos:</h3>
            <ClientForm completoDatos={completoDatos}/>
            { personalData 
            ?<button className="botonCheckout" onClick={createOrder}>Generar Pedido</button> 
            : ""}
        </div>
    )

}

export default Checkout