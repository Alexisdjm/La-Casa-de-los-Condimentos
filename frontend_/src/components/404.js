import Header from './header.js';
import Footer from './footer.js';
import Intro from './presentation.js';
import images from '../images/exporting';
import Toptext from './toptext.js';
import Featured from './featured';
import { useEffect } from 'react';

const NotFound = () => {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const NotText = ({first, second}) => {
        return(
            <>
                <div className='for0for-container'>
                    <h2>{first}</h2>
                    <h4>{second}/</h4>
                </div>
            </>
        )
    }

    return(
        <>
            <Header dynamic={true}/>
            <Intro image={images.bg4} image2={images.bg3} container='father-container'>
                <NotText first='404' second='No encontrado :' />
            </Intro>
            <Featured css='flex-col align-center section-margin'/>
            <Footer>
                <Toptext first='Síguenos en ' second='Instagram'/>
            </Footer>
        </>
    )
}

export default NotFound