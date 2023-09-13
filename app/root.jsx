import { useState, useEffect } from "react";
import { 
    Meta,
    Links,
    Link,
    Outlet,
    Scripts,
    LiveReload,
    useCatch
} from "@remix-run/react"


import styles from '~/styles/index.css'
import Header from "~/components/header";
import Footer from "~/components/footer";

//Agregamos informacion meta
export function meta() {
    return{
            charset: 'utf-8',
            title: 'GuitarLA - Remix',
            viewport: 'width=device-width,initia-scale=1'
        }
}

//Agregamos hojas de estilo
export function links(){
    return[
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        //En los 3 sigueintes objetos importamos las fonts de google
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: 'true'
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&family=Outfit:wght@400;700;900&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}


export default function App(){
    //Declaramos la variable carritoLS para traer los datos de local storage en carrito
    //LS se ejecuta del lado del cliente (en este caso se estaria ejecutando del lado del servidor). Por eso con typeof window
    //resolvemos ese error. 
    //Le decimos que si el codigo se ejecuta en el servidor, no haga nada. Pero si se ejecuta en navegador, agrega LS
    const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null;

    //Declaramos la variable para almacenar los datos de carrito
    //Si iniciamos carrito con un array vacio, LS va a modificarse siempre y comenzar vacio.
    //Por eso el valor inicial es lo que haya guardado en LS (si no hay nada guardado, iniciara como vacio)
    const [carrito, setCarrito] = useState(carritoLS);

    //Detectamos con useEffect cada vez que haya un cambio en carrito, y le agregamos lo que contiene el mismo
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito])

    //Declaramos las funciones para carrito
    const agregarCarrito = (guitarra) => {
        //Agarra todas las guitarras del array guitarras y compara si el id de cada una (guitarraState) y el id de
        //la guitarra que viene de $guitarraUrl son iguales. Si al menos 1 es igual, devuelve true
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id )){

            //Iterar para encontrar cual es la guitarra que ya existe
            const carritoActualizado = carrito.map( guitarraState => {
                
                if(guitarraState.id === guitarra.id)
                {
                    //Modificar cantidad
                    guitarraState.cantidad = guitarra.cantidad;
                }

                //Por cada iteracion del .map, debemos devolver la guitarra haya sido o no modificada
                return guitarraState;
            })

            //Seteamos el carritoActualizado a carrito 
            setCarrito(carritoActualizado)

        } else {
            //Registro nuevo. Tomamos copia de lo que ya esta y agregamos guitarra nueva
            setCarrito([...carrito, guitarra]);
            }
    }

    
    const modificarCantidad = guitarra => {
        //Iteramos sobre las guitarras de carrito para encontrar por id cual es la que se va a modificar
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad;
            }
            return guitarraState
       })
       //Editamos el carrito con las actualizaciones
       setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        //Iteramos sobre las guitarras de carrito y filtramos (nos quedamos con) las que su id 
        //sean diferentes a la que viene por la funcion
        const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id);
        setCarrito(carritoActualizado);
    }


    return(
        <Document>
            <Outlet
                context={
                    {
                        agregarCarrito,
                        carrito,
                        modificarCantidad,
                        eliminarGuitarra
                    }
                }
            />
        </Document>
    )

}


//Esqueleto del Html
function Document({children}){
    return(
        <html lang="es">

            <head>
                <Meta />
                <Links />
            </head>

            <body>
                <Header />
                {children}

                <Footer />
                {/* Con este componente evitamos que la pagina recargue al hacer click en un link. Siempre va a lo ultimo */}
                <Scripts />
                <LiveReload />
            </body>

        </html>

    )

}

/** MANEJO DE ERRORES */ 
export function CatchBoundary(){
    const error = useCatch()

    return (
        <Document>
            <p className="error">{ error.status } {error.statusText} </p>
            <Link className="error-enlace" to='/'>Volver a la pagina principal.</Link>
        </Document>
    )
}

export function ErrorBoundary({error}){
    return (
        <Document>
            <p className="error">{ error.status } {error.statusText} </p>
            <Link className="error-enlace" to='/'>Volver a la pagina principal.</Link>
        </Document>
    )
}