import Header from './header.js';
import Footer from './footer.js';
import Item from './item.js';
import Toptext from './toptext.js';

const SingleProduct = () => {
    return(
        <>
            <Header dynamic={false}/>
            <Item/>
            <Footer>
                <Toptext first='Síguenos en ' second='Instagram'/>
            </Footer>
        </>
    )
}

export default SingleProduct