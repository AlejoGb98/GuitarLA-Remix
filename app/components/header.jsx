import { Link, useLocation } from '@remix-run/react'
import Logo from '../../public/img/logo.svg'
import Navegacion from './navegacion';


//Siempe es recomendado para mejor performance usar Link en vez de 'a href'
const Header = () => {

  return (
    <header  className='header'>
        <div className="contenedor barra">

            <Link 
                to='/'
                className="logo">
                <img src={Logo} alt="logo" className="logo" />
            </Link>
            
            <Navegacion />
        </div>

    </header>
  )
}

export default Header
