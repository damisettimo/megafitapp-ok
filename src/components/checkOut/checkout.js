import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { collection, getDocs, query, where, documentId, writeBatch, addDoc, Timestamp } from "firebase/firestore"
import { db } from "../../services/firebase";
import ClientForm from "../Form/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Checkout = () => {

    const [loading, setLoading] = useState(false)

    const [personalData, setPersonalData] = useState(false)
    
            const [datosCompra, setDatosCompra] = useState({}) 

    const completeDates = (name, surname, address, phone, email) =>{
            setDatosCompra({name, surname, address, phone, email})
            setPersonalData(true)
        }

    const { cart, total, clearCart } = useContext(CartContext)

    const navigate = useNavigate()

    const createOrder = async () => {

        setLoading(true)

        try {
            const objOrder = {
                buyer: datosCompra,
                items: cart,
                total: total,
                date:Timestamp.fromDate(new Date())
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

                clearCart()

                setTimeout(() => {
                    navigate('/')
                }, 4000)
                Swal.fire({
                    title: "Muchas gracias por su compra",
                    text:`El id de su orden es: ${orderAdded.id}`,
                    icon: "success",
                    buttons: true,
                    dangerMode: true,
                
                })
            } else {
                Swal.fire({
                    title: "Sin stock en algunos productos",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                
                })           
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
            <h2 className="p-3 mb-2 bg-dark text-white" >Checkout de tu Compra</h2>
            <br></br>
            <h3>Completa con tus datos:</h3>
            <ClientForm completeDates={completeDates}/>
            { personalData 
            ?<button className="btn btn-danger" onClick={createOrder}>Generar Pedido</button> 
            : ""}
            <br></br>
        </div>
    )

}

export default Checkout