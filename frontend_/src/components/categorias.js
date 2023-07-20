import images from "../images/exporting.js";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { Element } from 'react-scroll';

const Categories = ({margin, textalign}) => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1441},
            items: 6
        },
        desktop: {
            breakpoint: { max: 1440, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1023, min: 768 },
            items: 5
        },
        mobile: {
            breakpoint: { max: 767, min: 281 },
            items: 4
        },
        zfold: {
            breakpoint: {max: 280, min: 0},
            items: 2
        }
    };

    return(
        <>
            <Element name="categorias" id="categorias" className={`flex-col align-center ${margin} relative`}>
                <div className={`flex-center ${textalign}`}>
                    <h1 className="categories-warning">Filtrar por Categorias</h1>
                    <h4 className="categories-info">Todas las Categorias</h4>
                </div>
                <div className="flex-center categories-container">
                    <Link className="categories-link-container align-center" to='/products/co'>
                        <img className="categories-img" src={images.condimentoIcon} alt="condimentos"></img>
                        Condimentos
                    </Link>
                    <Link className="categories-link-container align-center" to='/products/bk'>
                        <img className="categories-img" src={images.bakery} alt="bakery"></img>
                        Repostería
                    </Link>
                    <Link className="categories-link-container align-center" to='/products/nt'>
                        <img className="categories-img" src={images.nueces} alt="secos"></img>
                        Frutos secos
                    </Link>
                    <Link className="categories-link-container align-center" to='/products/gr'>
                        <img className="categories-img" src={images.rice} alt="granos"></img>
                        <p className="categories-name-text">Granos y cereales</p>
                    </Link>
                    <Link className="categories-link-container align-center" to='/products/gc'>
                        <img className="categories-img" src={images.butter} alt="Víveres"></img>
                        Víveres
                    </Link>
                    <Link className="categories-link-container align-center" to='/products/ch'>
                        <img className="categories-img" src={images.chemical} alt="quimicos"></img>
                        <p className="categories-name-text">Químicos y más</p>
                    </Link>
                </div>
                <div className="categories-mobile-container">
                    <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={7500} ssr={true} draggable={true} infinite={true} removeArrowOnDeviceType={["tablet", "mobile", "zfold"]}>
                        <div className="flex-col align-center categories-mobile-box">
                            <Link to='/products/co' className="categories-mobile-circle">
                                <img src={images.condimentoIcon} alt='condimentos' className='categories-mobile-img'></img>
                            </Link>
                            <h1 className="categories-mobile-text">Condimentos</h1>
                        </div>
                        <div className="flex-col align-center categories-mobile-box">
                            <Link to='/products/bk' className="categories-mobile-circle">
                                <img src={images.bakery} alt='bakery' className='categories-mobile-img'></img>
                            </Link>
                            <h1 className="categories-mobile-text">Repostería</h1>
                        </div>
                        <div className="flex-col align-center categories-mobile-box">
                            <Link to='/products/nt' className="categories-mobile-circle">
                                <img src={images.nueces} alt='secos' className='categories-mobile-img'></img>
                            </Link>
                            <h1 className="categories-mobile-text">Frutos secos</h1>
                        </div>
                        <div className="flex-col align-center categories-mobile-box">
                            <Link to='/products/gr' className="categories-mobile-circle">
                                <img src={images.rice} alt='granos' className='categories-mobile-img'></img>
                            </Link>
                            <h1 className="categories-mobile-text">Granos y cereales</h1>
                        </div>
                        <div className="flex-col align-center categories-mobile-box">
                            <Link to='/products/gc' className="categories-mobile-circle">
                                <img src={images.butter} alt='Víveres' className='categories-mobile-img'></img>
                            </Link>
                            <h1 className="categories-mobile-text">Víveres</h1>
                        </div>
                        <div className="flex-col align-center categories-mobile-box">
                            <Link to='/products/ch' className="categories-mobile-circle">
                                <img src={images.chemical} alt='quimicos' className='categories-mobile-img'></img>
                            </Link>
                            <h1 className="categories-mobile-text">Químicos y más</h1>
                        </div>
                    </Carousel>
                </div>
            </Element>
        </>
    )
}

export default Categories