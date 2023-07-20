import Header from './header.js';
import Intro from './presentation.js';
import Footer from './footer.js';
import images from '../images/exporting';
import IntroText from './introtext';
import FirstSection from './firstview';
import Categories from './categorias';
import Promotion from './promotion';
import Business from './business';
import Featured from './featured';
import Toptext from './toptext.js';
import { useEffect } from 'react';

const Home = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return(
        <>
            <Header dynamic={true}/>
            <Intro image={images.bg2} image2={images.bg1} container='content-box-intro fit-content'>
                <IntroText/>
            </Intro>
            <FirstSection/>
            <Categories margin='categories-section-margin' textalign='categories-text-align'/>
            <Promotion/>
            <Featured css='flex-col align-center section-margin'/>
            <Business/>
            <Footer>
                <Toptext first='Síguenos en ' second='Instagram'/>
            </Footer>
        </>
    )
}

export default Home