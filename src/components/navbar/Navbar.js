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
    <nav className="navbar navbar-expand-lg  bg-danger" >
      <div className="container-fluid">
      <NavLink to='/'>
        <h1 className="navbar-brand text-primary display-2" href="#"><h1 class="display-2">Megafit-Sup</h1></h1>
      </NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul className="navbar-nav">
        <li className="Categories">
        <h3 className="Categories">
        {   
            categories.map(cat => (
              <NavLink key={cat.id} to={`/category/${cat.slug}`} className={({ isActive}) => isActive ? 'ActiveOption' : 'Option'}>{cat.label}</NavLink>
            ))
          }
        </h3>
          
        </li>
      </ul>
    </div>
        <NavLink to='/cart'>
          <CartWidget />
        </NavLink>
        </div>
    </nav>
  )
}

export default NavBar







