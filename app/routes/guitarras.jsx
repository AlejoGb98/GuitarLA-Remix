import { Outlet, useOutletContext } from "@remix-run/react";
import styles from '~/styles/guitarras.css'

export function links (){
  return[
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}


const Tienda = () => {
  return (

   <main className="contenedor">

      {/* En Outlet se inyecta el contenido de la ruta dinamica $guitarrasUrl */}
      <Outlet
      //Pasamos useOutletContext a los hijos para poder usar la funcion
        context={useOutletContext()}
      />
      
   </main>

  )
}

export default Tienda
