
import { Link } from 'react-router-dom'
const Item = ({id, name, img, category, price }) => {
    
    return (
        <div className="row align-items-center" key={id}>
            <div className="col card" style={{ width: "18rem"}}>
                <div className="col card-body">
                    <h5 className="card-title">{name}</h5>
                    <img src={img} alt="logo MegaFit-Sup"/>
                    <h3>{category}</h3>
                    <p className="card-text">${price}</p>
                    <Link to={`/detail/${id}`}><button className="btn btn-primary">Ver detalle</button></Link>
                </div>
            </div> 

        </div>
    )
}

export default Item