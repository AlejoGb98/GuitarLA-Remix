import { Link, useLocation } from "@remix-run/react"
import carrito from '../../public/img/carrito.png'


const Navegacion = () => {
    //Importamos location para resaltar en que pagina estamos en la barra nav, usando el pathname
    const location = useLocation();

  return (

    <nav className='navegacion'>
        <Link
            to='/'
            className={location.pathname === '/' ? 'active' : ''}>
                Inicio
        </Link>

        <Link
            to='/nosotros'
            className={location.pathname === '/nosotros' ? 'active' : ''}>
                Nosotros
        </Link>

        <Link
            to='/guitarras'
            className={location.pathname === '/guitarras' ? 'active' : ''}>
                Tienda
        </Link> 

        <Link
            to='/blog'
            className={location.pathname === '/blog' ? 'active' : ''}>
                Blog
        </Link>
        
        <Link
            to='/carrito'>
                <img src={carrito} alt="imagencarrito" />
        </Link>
    </nav>
  )
}

export default Navegacion
