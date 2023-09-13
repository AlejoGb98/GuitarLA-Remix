export async function getCursos(){
    //Utilizamos variable de entorno en .env para esconder la URL.
    const respuesta =  await fetch(`${process.env.API_URL}/curso?populate=imagen`);
    const resultado = await respuesta.json();

    return resultado
}
