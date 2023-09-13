export async function getGuitarras(){
    //Utilizamos variable de entorno en .env para esconder la URL.
    const respuesta =  await fetch(`${process.env.API_URL}/guitarras?populate=imagen`);
    const resultado = await respuesta.json();

    return resultado
}

export async function getGuitarra(url){
    //Utilizamos variable de entorno en .env para esconder la URL.
    //Con 'filter[url] le decimos que queremos filtarr por url
    const respuesta = await fetch(`${process.env.API_URL}/guitarras?filters[url]=${url}&populate=imagen`)
    const resultado = await respuesta.json();

    return resultado
}