import { useState, useEffect } from "react"
import ItemDetail from "../ItemDetail.js/ItemDetail"
import { useParams } from "react-router-dom"
import { getDoc, doc } from "firebase/firestore"
import { db } from "../../services/firebase"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState ([])
    const [loading, setLoading] = useState(true)
    
    const {productId} = useParams()
 
    useEffect (()=>{

        const docRef = doc(db, "products", productId)

        getDoc(docRef).then(response => {
            const data = response.data()
            const productAdapted = {id: response.id, ...data}
            setProduct(productAdapted)
        }).finally(() => {
            setLoading(false)
        })


    }, [productId])

    if(loading) {
        return <h1>Cargando...</h1>
    }

   // const onAdd = (quantity) => {
     //   console.log (`Compraste ${quantity} unidades`)
    //}

    return(
        <div>
            <h2>Detalle de Suplemento</h2>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer
