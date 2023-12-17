import images from "../images/exporting"
import Header from "./header"
import Footer from "./footer"
import Intro from "./presentation"
import Toptext from "./toptext"
import CartContent from "./CartContent"

const Cart = () => {
    return(
        <>
            <Header dynamic={true}/>
            <Intro image={images.bg4} image2={images.bg2} container='product-centered-text alternative-product-title-position'>
                <Toptext first='' second='Carrito'/>
            </Intro>
            <CartContent/>
            <Footer>
                <Toptext first='Siguenos en' second='Instagram'/>
            </Footer>
        </>
    )
}

export default Cart