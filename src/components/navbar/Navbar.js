import { useState, useEffect } from 'react'
import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import { getDocs, collection, query} from 'firebase/firestore'
import { db } from '../../services/firebase'


const NavBar = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const collectionRef = query(collection(db, 'categories')) 

    getDocs(collectionRef).then(response => {

      const categoriesAdapted = response.docs.map(doc => {
        const data = doc.data()
        const id = doc.id

        return { id, ...data}
      })
      setCategories(categoriesAdapted)
    })
  }, [])

  return (
    <nav className="NavBar" >
      <NavLink to='/'>
          <h3>Megafit</h3>
      </NavLink>

        <div className="Categories">
          {
            categories.map(cat => (
              <NavLink key={cat.id} to={`/category/${cat.slug}`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>{cat.label}</NavLink>
            ))
          }
            {/* <NavLink to={'/category/celular'} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Celular</NavLink>
            <NavLink to={'/category/tablet'} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Tablet</NavLink>
            <NavLink to={'/category/notebook'} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>Notebook</NavLink> */}
        </div>
        <NavLink to='/cart'>
          <CartWidget />
        </NavLink>
    </nav>
  )
}

export default NavBar








// import CartWidget from "../CartWidget/CartWidget"
// import { Link } from "react-router-dom"

// const Navbar = () => {
//     return (
//         <nav className="navbar navbar-expand-lg bg-primary">
//   <div className="container-fluid">
//     <Link to='/'>
//     <h1 className="navbar-brand text-danger display-2" href="#"><h1 class="display-2">Megafit-Sup</h1></h1>
//     </Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarNav">
//       <ul className="navbar-nav">
//         <li className="nav-item">
//         <Link to='/category/proteina'>
//           <button className="nav-link active" aria-current="page" href="#">Proteinas</button>
//         </Link>
//         </li>
//         <li className="nav-item">
//           <Link to='/category/creatina'>
//           <button className="nav-link" href="#">Creatinas</button>
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to='/category/pre-entrenamiento'>
//           <button className="nav-link" href="#">Pre-entrenamiento</button>
//           </Link>
//         </li>
//       </ul>
//     </div>
//     <CartWidget />
//   </div>
// </nav>

        
//     )
// }

// export default Navbar