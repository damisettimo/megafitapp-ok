import './ItemListContainer.css'
import { useState, useEffect} from 'react'
import ItemList from '../ItemList/ItemList'
import { useParams } from 'react-router-dom'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase'

const ItemListContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()

    useEffect(() => {
        setLoading(true)

        const collectionRef = categoryId 
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')
        
        getDocs(collectionRef).then(response => {
            const productsAdapted = response.docs.map(doc =>{
                const data = doc.data()
                console.log(data)

                return { id:doc.id, ...data }
            })
            console.log(productsAdapted)
            setProducts(productsAdapted)
            //setProducts(response)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })  
    }, [categoryId])


    if(loading) {
        return <h1>Cargando productos...</h1>
    }

    
    return (
        <div>
            <br></br>
            <div>
            <section>
       <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={"https://img.freepik.com/foto-gratis/gente-tiro-completo-entrenando-gimnasio_23-2149049754.jpg?w=740&t=st=1667679322~exp=1667679922~hmac=92698e61cb75109520f208a0e57a4b3b9d60c4e2c48b31e20e0d4ca8e0e7c1a6"} class="img-carousel" alt="1"></img>
            <div className="carousel-caption d-none d-md-block">
              <h1 className="text-light bg-dark">BIENVENIDO/A!</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src={"https://img.freepik.com/foto-gratis/gente-forma-tiro-medio-haciendo-ejercicios-juntos_23-2149326127.jpg?w=740&t=st=1667679128~exp=1667679728~hmac=342c5a9f0e78cc3b57f65b4eebcf08fb9ecaa11264b155bac9e707ce443c3285"} class="img-carousel" alt="2"></img>
            <div className="carousel-caption d-none d-md-block">
              <h1 className="text-light bg-dark">Encontra lo mejor en suplementos</h1>
            </div>
          </div>
          <div className="carousel-item">
            <img src={"https://img.freepik.com/foto-gratis/grupo-personas-felices-sentados-piso-despues-entrenamiento_23-2147949631.jpg?w=740&t=st=1667678889~exp=1667679489~hmac=9f984d44ace93f76f3bd185116c130fead9f9c306eaf0aa679ea0a610858b390"} alt="3"></img>
            <div className="carousel-caption d-none d-md-block">
              <h1 className="text-light bg-dark">Ponelos a prueba!</h1>
            </div>
          </div>  
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

    </section>
            </div>
            <br></br>
            <h2 className="p-3 mb-2 bg-danger text-white" >Nuestros Suplementos:</h2>
            <div className="container">
                <div className="row align-items-center">
                    <div className="row">
                        <ItemList products={products} />
                    </div>
                </div>     
            </div>
        </div>
    )        
}



export default ItemListContainer