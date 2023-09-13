import { useOutletContext } from '@remix-run/react'
import styles from '../styles/carrito.css'
import { useEffect, useState } from 'react'
import { ClientOnly } from 'remix-utils'

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export function meta(){
  return{
    title: 'GuitarLA - Carrito',
    description: 'Venta de guitarras, musica, blog, carrito'
  }
}

const Carrito = () => {

  const { carrito } = useOutletContext()
  const { modificarCantidad } = useOutletContext()
  const { eliminarGuitarra } = useOutletContext()

  const [total, setTotal] = useState(0);

  //Cada vez que el array de carrito se modifique, modificamos total
  //reduce itera por cada elemento en el carrito y suma total (que comienza en 0) por el resultado de la cantidad*precio de cada articulo
  useEffect(() => {
    const calculoTotal = carrito.reduce( (total, producto) => total + (producto.cantidad * producto.precio), 0)
    setTotal(calculoTotal);
  }, [carrito])


  return (
    <ClientOnly fallback={'cargando'}>
      {() => (
        <main className="contenedor">
            <h1 className="heading">Carrito de Compras</h1>

            <div className="contenido">
              <div className="carrito">
                <h2> Articulos </h2>
              {/*  Iteramos sobre el array carrito para mostrar los productos o carrito vacio 
                    Utilizamos Optionalchaining para evitar error en la pagina al demorar en cargar LS*/}
                {carrito?.length === 0 ? 'Carrito vacio' : (
                  carrito?.map( producto => (

                    <div key={producto.id} className='producto'>
                      
                      <div>
                        <img src={producto.imagen} alt={`Imagen de ${producto.nombre}`} />
                      </div>

                      <div>

                        <p className="nombre">{producto.nombre}</p>
                        <p className="cantidad">Cantidad:</p>
                        {/* Permitimos modificar cantidad en caso sea necesario, pero traemos por default al value la cantidad original */}
                          <select
                            value={producto.cantidad}
                            className='select'
                            onChange={e => modificarCantidad({
                              cantidad: parseInt(e.target.value),
                              id: producto.id
                            })}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                          </select>

                        <p className="precio">$ <span>{producto.precio}</span></p>
                        <p className="subtotal">Subtotal: $<span>{producto.cantidad * producto.precio}</span></p>
                      
                      </div>
                      
                      <button 
                        className="btn_eliminar"
                        type='button'
                        onClick={() => eliminarGuitarra(producto.id)}>
                        X
                      </button>

                    </div>
                  ))
                )}
              </div>


              <aside className="resumen">
                  <h3>Resumen del Pedido</h3>
                  <p className='subtotal'>Subtotal: ${parseInt(total * 0.8197)}</p>
                  <p className='subtotal'>Iva: ${parseInt(total * 0.1803)}</p>
                  <p className='total'>Total a Pagar: ${total}</p>
              </aside>

            </div>

          
        </main>
      )}
    </ClientOnly>
  )
}

export default Carrito
