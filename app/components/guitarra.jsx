import { Link } from "@remix-run/react"

const Guitarra = ({guitarra}) => {
  
    //Destructuring al objeto de guitarra que viene via props de tienda.jsx
    const {descripcion, imagen, precio, URL, nombre} = guitarra
  
    return (
        <div className="guitarra">

            <img src={imagen.data.attributes.formats.medium.url} alt={`Imagen guitarra ${nombre}`}/>

            <div className="contenido">
                <h3>{nombre}</h3>
                <p className="descripcion">{descripcion}</p>
                <p className="precio">${precio}</p>
                <Link className="enlace" to={`/guitarras/${URL}`}>Ver Producto</Link>
            </div>

        </div>
    )
}

export default Guitarra
