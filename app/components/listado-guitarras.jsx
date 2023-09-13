import Guitarra from "./guitarra"

const ListadoGuitarras = ({guitarras}) => {
  return (
    <>
        <h2 className="heading">Nuestra Coleccion</h2>
        
        {guitarras.length && (
        <div className="guitarras-grid">
            {guitarras.map(guitarra => (
            <Guitarra 
                guitarra = {guitarra.attributes}
                key = {guitarra.id}
            />
            ))}
        </div>
        )}
     </>   
  )
}

export default ListadoGuitarras
