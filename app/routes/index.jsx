import { useLoaderData } from '@remix-run/react'
import { getGuitarras } from '../models/guitarras.server'
import { getPosts } from '../models/post.server'
import { getCursos } from '../models/cursos.server'
import ListadoGuitarras from '../components/listado-guitarras'
import ListadoPosts from '../components/listado-posts'
import Curso from '../components/curso'
import stylesGuitarras from '../styles/guitarras.css'
import stylesPosts from '../styles/blog.css'
import stylesCurso from '../styles/curso.css'

export function meta(){

}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: stylesGuitarras
    },
    {
      rel: 'stylesheet',
      href: stylesPosts
    },
    {
      rel: 'stylesheet',
      href: stylesCurso
    }
  ]
}

export async function loader(){

  //De esta manera, evitamos declarar por separado los get, ya que al ser funcion asincrona, el segundo get no se ejecutara hasta que el primero finalice.
  //Asi se ejecutaran ambos al mismo tiempo. Mejora el performance
  const [guitarras, posts, cursos] = await Promise.all([
    getGuitarras(),
    getPosts(),
    getCursos()
  ])

  return{ guitarras: guitarras.data,
          posts: posts.data,
          cursos: cursos.data}
}

const Index = () => {
  //Al ser un objeto con datos, lo que devuelve el loader tambien viene como un objeto. Accedemos a ellos mediante distrocturing
  const {guitarras, posts, cursos} = useLoaderData()
  
  
  return (
    <>
      <main className="contenedor">
        <ListadoGuitarras
          guitarras={guitarras}  
        />
      </main>

      <Curso 
        curso = {cursos.attributes}
      /> 

      <section>
        <ListadoPosts
          posts={posts}
        />
      </section>
    </>
  )
}

export default Index
