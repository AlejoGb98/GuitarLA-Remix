import imagen from '../../public/img/nosotros.jpg'
import styles from '~/styles/nosotros.css'

export function meta(){
  return 
  {
    title: 'GuitarLA - Nosotros';
    description: 'Venta de guitarras, blog de musica'
  }
}

export function links(){
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

const Nosotros = () => {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading"> Nosotros </h2>

      <div className='contenido'>
        <img src={imagen} alt="imagen nosotros" />

        <div>
          <p>
          Ut malesuada mattis elit, nec faucibus enim porttitor sit amet. Quisque in mattis lorem, ut aliquet nibh. Aliquam erat volutpat. Cras vitae nunc consequat, faucibus metus vel, porta neque. Duis lacinia lobortis elementum. Curabitur ipsum sem, iaculis ut iaculis ut, congue nec dui. Etiam ante sapien, vestibulum et pretium a, viverra a quam. Vestibulum malesuada velit sit amet nisl blandit euismod.
          </p>

          <p>
          Praesent posuere tellus in libero dignissim faucibus. Duis rutrum, enim id mollis sodales, ante orci laoreet felis, consectetur hendrerit sem enim vel turpis. Curabitur at dictum sem. Ut euismod erat elit, a aliquam magna dictum sed. Nulla ex enim, auctor sit amet laoreet id, consequat vel libero. Mauris aliquet justo vel elit pharetra imperdiet. Nullam at dapibus neque, in blandit ex. Vivamus arcu lectus, mattis vitae semper eget, blandit et urna. Donec lobortis, metus id mollis volutpat, libero massa ullamcorper libero, quis aliquet turpis est sit amet massa. Nullam suscipit elementum fringilla. Duis eu libero at mauris iaculis laoreet posuere vitae sem. Quisque a dapibus tortor. Sed tincidunt quam ut nisi dapibus tempor a a odio. Quisque fringilla ligula eu quam dapibus lobortis.
          </p>
        </div>
      </div>



    </main>
  )
}

export default Nosotros
