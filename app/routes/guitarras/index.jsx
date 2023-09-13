import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "~/models/guitarras.server"

import ListadoGuitarras from "../../components/listado-guitarras";

//Agregamos informacion meta
export function meta() {
  return{
          title: 'GuitarLA - Tienda',
          viewport: 'width=device-width,initia-scale=1'
      }
}

export async function loader(){
  const guitarras = await getGuitarras();
  return guitarras.data;
}

const Tienda = () => {
  //Importamos el return del loader con el hook useLoaderData
  const guitarras = useLoaderData();

  return (
    <ListadoGuitarras
      guitarras={guitarras}
    />
  )
}

export default Tienda
