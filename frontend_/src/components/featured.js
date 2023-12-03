import images from '../images/exporting.js'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Featured = ({css}) => {

    const [products, setProducts] = useState(null)

    async function fetchData(url, state) {
        const res = await fetch(url)
        const data = await res.json()
        
        return state(data)
    }

    useEffect(() => {
        fetchData('https://casacondimentos.com//api/products/featured/', setProducts)
    }, [])

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1367 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 1366, min: 1101 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1100, min: 768 },
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
            <div className={css}>
                <div className='title-container'>
                    <h1 className='featured-title'>Productos Destacados</h1>
                    <img src={images.underline} alt='underline'></img>
                </div>
                <div className='slider-container'>
                    <Carousel responsive={responsive} autoPlay={true} autoPlaySpeed={3500} ssr={true} draggable={true} infinite={true} removeArrowOnDeviceType={["tablet", "mobile", "zfold"]}>
                    {products !== null ? products.map((product) => {
                        return(
                            <Link key={product.id} to={`/product/${product.id}`}>
                                <div  className='featured-product-card flex-col align-center center'>
                                    <div className='product-image-container'>
                                        <img className='product-img' src={product.image} alt={product.name}></img>
                                        <div className='flex-col product-inner-text'>
                                            <h1 className='product-name'>{product.name}</h1>
                                            <h4 className='product-price'>{product.price + ' $'}</h4>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }) : <div className='featured-product-card flex-col align-center center'></div> }
                    </Carousel>
                </div>
            </div>
        </>
    )
}

export default Featured