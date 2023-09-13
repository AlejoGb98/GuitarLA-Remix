import { useLoaderData } from "@remix-run/react";
import { getPost } from '../../models/post.server'
import { formatearFecha } from '../../utils/helpers'
import styles from '../../styles/blog.css'

 export async function loader ({params}){
  //Params nos trae la info luego del / en el link: 'posts/params'. En este caso es el nombre de cada blog
  const { postUrl } = params; 

  //Llamamos la funcion getPost y le pasamos la variable postUrl para traer los datos de la bdd segun el params
  const post = await getPost( postUrl );

  if(post.data.length === 0){
    throw new Response('',{
      status:404,
      statusText: 'Post no encontrado'
    })
  }

  return post;
}


export function meta ({data}){
  if(!data){
    return{
      title: 'GuitarLA - Blog no encontrado',
      description: 'Gutiarra, venta de guitarras, blog no encontrado'
    }
  }

  return{
    title: `GuitarLA - ${data.data[0].attributes.titulo}` ,
    description: `Guitarra, venta de guitarras, blog ${data.data[0].attributes.titulo}`
  }

}

const Post = () => {
  const post = useLoaderData();

  const {titulo, contenido, imagen, publishedAt } = post.data[0].attributes

  return (
    <article className="post mt-3">
      <img src={imagen.data.attributes.formats.medium.url} alt={`imagen blog ${titulo}`} className="imagen" />
        
        <div className="contenido">
            <h3>{titulo}</h3>
            <p className="fecha">{formatearFecha(publishedAt)}</p>
            <p className="texto">{contenido}</p>
        </div>


    </article>
  )
}

export default Post
