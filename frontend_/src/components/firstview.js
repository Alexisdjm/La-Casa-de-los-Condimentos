import images from '../images/exporting.js'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';

const FirstSection = () => {

    const content = {
        main: 'es el sitio ideal para amantes de la cocina, restaurantes, chef profesionales y amas de casa. Además, nos esforzamos en traer gran cantidad de productos de la mejor',
        name: 'Casa de los Condimentos',
        clave: 'calidad, sabor y frescura.',
        message: 'Ofrecemos diversidad de condimentos, ingredientes de repostería, frutos secos, encurtidos , productos lácteos, dulces y mucho más.'
    }

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1441},
            items: 5
        },
        desktop: {
            breakpoint: { max: 1440, min: 1280 },
            items: 4
        },
        smallDesktop: {
            breakpoint: {max: 1279, min: 1024},
            items: 3
        },
        tablet: {
            breakpoint: { max: 1023, min: 768 },
            items: 3
        },
        mobile: {
            breakpoint: { max: 767, min: 281 },
            items: 2
        },
        zfold: {
            breakpoint: {max: 280, min: 0},
            items: 1
        }
    };

    return(
        <>
            <div className='flex-col align-center svg-next-container'>
                <div className='flex-center fit-content relative'>
                    <div className='quotes-container'>
                        <img className='quotes' src={images.quotes} alt='quotes'></img>
                    </div>
                    <h4 className='business-frase'>La <strong>{content.name}</strong> {content.main} <strong>{content.clave}</strong></h4>
                </div>
                <div className='flex-col align-center' style={{marginTop: '2em'}}>
                    <h1 className='big-title justify-center-text'>Llevamos los mejores productos a tu mesa</h1>
                    <img className='underline' src={images.underline} alt='underline'></img>
                    <p className='message-slider'>{content.message}</p>
                </div>
                <div className='slider-container'>
                    <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={3500} ssr={true} draggable={true} infinite={true} removeArrowOnDeviceType={["tablet", "mobile", "zfold"]}>
                        <div className='first-slider-card' style={{backgroundImage: `url(${images.oregano})`}}></div>
                        <div className='first-slider-card' style={{backgroundImage: `url(${images.cebolla})`}}></div>
                        <div className='first-slider-card' style={{backgroundImage: `url(${images.canelaMolida})`}}></div>
                        <div className='first-slider-card' style={{backgroundImage: `url(${images.canelaRama})`}}></div>
                        <div className='first-slider-card' style={{backgroundImage: `url(${images.pimientaMolida})`}}></div>
                        <div className='first-slider-card' style={{backgroundImage: `url(${images.pimientaNegra})`}}></div>
                        <div className='first-slider-card' style={{backgroundImage: `url(${images.comino})`}}></div>
                    </Carousel>
                </div>
                <Link to='/products/all' className='casa-btn'>Todos los Productos</Link>
            </div>
        </>
    )
}

export default FirstSection