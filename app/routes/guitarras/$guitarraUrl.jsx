import { useState } from 'react';
import { useLoaderData, useOutletContext } from '@remix-run/react';
import { getGuitarra } from '~/models/guitarras.server'


export async function loader({params}){
  //Params nos trae la info luego del / en el link 'guitarras/params'. En este caso es el nombre de cada una
  const { guitarraUrl } = params;


  //Le pasamos a getGuitarra el param de la Url para poder hacer fetch sobre esa guitarra
  const guitarra = await getGuitarra( guitarraUrl );
  
  //Si guitarra esta vacio no trae resultados por bdd, largo del array = 0. Lanzamos error
  if(guitarra.data.length === 0){
    throw new Response('',{
      status:404,
      statusText: 'Guitarra no encontrada'
    })
  }

  //Si se cumple la condicion y tiramos el error, corta el codigo. Data viene vacio para la funcion meta, pero si lee. Da error
  return guitarra
}

//Cuando un loader pasa informacion al componente, data trae tambien esa info
//Si el loader no pasa nada (trow new response corta el codigo y no llega al return), data viene undefined
export function meta({data}) {
  //Si data es undefinded (no trae nada)
  if(!data){
    return{
      title: `GuitarLA - Guitarra no encontrada`,
      description:`Guitarra, venta de guitarras, guitarra no encontrada`
    }
  }

  return{
          title: `GuitarLA - ${data.data[0].attributes.nombre}`,
          description:`Guitarra, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
      }
}


const Guitarra = () => {
  //Traemos las funciones del useOutletContext
  const {agregarCarrito} = useOutletContext();

  //con useState tomamos el valor de la cantidad de unidades a llevar, con el onchange del Select
  const [cantidad, setCantidad] = useState(0)

  const handleSubmit = e => {
    e.preventDefault();

    if(cantidad < 1 ){
      alert('Debes seleccionar al menos una unidad');
      return
    }

    //Creamos objeto con los datos de la guitarra para no volver a llamar la API
    const guitarraSeleccionada = {
      id: guitarra.data[0].id,
      imagen: imagen.data.attributes.url,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    }

    agregarCarrito(guitarraSeleccionada);
  }

  const guitarra = useLoaderData();

  //console.log(guitarra.data[0].attributes.nombre)
  const {nombre, descripcion, imagen, precio} = guitarra.data[0].attributes

  return (
    <div className="guitarra">

      <img src={imagen.data.attributes.url} alt={`Imagen ${nombre}`} className="imagen" />

      <div className="contenido">
        <h3>{nombre}</h3>
        <p className="texto">{descripcion}</p>
        <p className="precio">${precio}</p>
      

        <form onSubmit={handleSubmit} className="formulario">

          <label htmlFor="cantidad">Cantidad</label>
          <select 
            onChange={e => setCantidad(parseInt(e.target.value))}
            id="cantidad">
            
            <option value='0'>--Seleccionar--</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>

          </select>

          <input type="submit"
                  value='Agregar al Carrito'
          />
        </form>
      </div>
    </div>
  )
}

export default Guitarra
