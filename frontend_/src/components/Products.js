import Toptext from './toptext.js';
import images from '../images/exporting';
import Intro from './presentation.js';
import Header from './header.js';
import Footer from './footer.js';
import Container from './catContainer.js';
import Categories from './categorias.js';
import ProductsContainer from './productsGallery.js';
import Featured from './featured';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Products = () => {

    const location = useLocation()

    const [first, setfirst] = useState('')
    const [second, setSecond] = useState('')
    const [elements, setElements] = useState(null)
    const [loc, setLoc] = useState(location.pathname)

    const array = [
        ['co', ('Condimentos y '), ('Especias')],
        ['bk', ('Productos de '), ('Repostería')],
        ['nt', ('Frutos '), ('Secos')],
        ['gr', ('Granos y '), ('Cereales')],
        ['gc', (''), ('Víveres')],
        ['ch', ('Químicos y '), ('Más')]
    ]

    const searchCategory = (location) => {

        for (let i = 0; i < array.length; i++) {
            if (array[i][0] === location.split('/').at(-1)) {
                return [array[i][1], array[i][2]]
            }
        }
    }

    async function fetchData(url, state) {
        const res = await fetch(url)
        const data = await res.json()
        window.scrollTo(0, 0)
        
        return state(data)
    }

    useEffect(() => {

        setLoc(location.pathname)

        fetchData(`http://127.0.0.1:8000/api/products/${loc.split('/').at(-1)}/`, setElements)

        if ( loc.split('/').at(-1) === 'all') {
            setfirst('Todos Los ');
            setSecond('Productos')
        } else {
            let texts = searchCategory(loc);
            setfirst(texts[0])
            setSecond(texts[1])
        }
    }, [loc, location])
    return(
        <>
            <Header dynamic={true}/>
            <Intro image={images.bg3} image2={images.bg1} container='product-centered-text'>
                <Toptext first={first} second={second}/>
            </Intro>
            <Container>
                <Categories margin='categories-section-padding' textalign='categories-text-padding'/>
            </Container>
            <ProductsContainer elements={elements}/>
            <Featured css='products-section-featured flex-col align-center'/>
            <Footer>
                <Toptext first='Síguenos en ' second='Instagram'/>
            </Footer>
        </>
    )
}

export default Products