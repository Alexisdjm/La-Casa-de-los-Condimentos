import images from '../images/exporting'
import { FaInstagram } from 'react-icons/fa';
import { useState, useEffect } from "react";
import Sidebar from './sidebar.js';
import { Link } from 'react-router-dom';
import Checkpath from './checkpath';


const Header = ({dynamic}) => {

    const [toggle, setToggle] = useState(false)
    const [menu, setMenu] = useState(false)

    const setSidebar = (e) => {
        e.preventDefault()
        toggle ? setToggle(false) : setToggle(true)
    }

    const setMenuu = (e) => {
        e.preventDefault()
        menu ? setMenu(false) : setMenu(true)
    }

    const [header, setHeader] = useState(false)

    const ScrollToTop = () => {
        if (window.location.pathname !== '/') {
            return
        }
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }
    
    useEffect(() => {
        document.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setHeader(true)
            } else {
                setHeader(false)  
            }
        })
      }, []);

    return(
        <>

            {dynamic ? (
                <>
                    <div className={!header ? 'header-container' : 'header-container-scroll'}>
                        <div className='simple-flex space-between header-align align-center'>
                            <a className='icon-link mobile-show' href='/' onClick={setSidebar}>
                                <img className='mobile-header-icons' src={!header ? images.searchNaranja : images.search} alt='cart'></img>
                            </a>
                            <div className='flex-center header-containers-gap left-links-width' style={{width:'38%'}}>
                                <Link className={!header ? 'each-link' : 'scroll-link'} to='/' onClick={ScrollToTop}>Inicio</Link>  
                                <Link className={!header ? 'each-link' : 'scroll-link'} to='/products/all'>Productos</Link>
                                <Checkpath css={!header ? 'each-link' : 'scroll-link'} path='/' optional='/products/all' id='categorias'>Categorias</Checkpath>
                                <a className={!header ? 'each-link' : 'scroll-link'} href='/' onClick={setSidebar}>Buscar</a>  
                            </div>
                            
                            <a href='/' className={!header ? 'logo-header-container align-logo-center' : 'logo-header-container-scroll align-logo-center'}>
                                <img className='logo-header' src={!header ? images.logoNaranja : images.logoNegro} alt='logo'></img>
                            </a>
                            <a className='icon-link mobile-show' href='/' onClick={setMenuu}>
                                <img className={!header ? 'mobile-menu-icon' : 'mobile-scroll-menu'} src={!header ? images.menuNaranja : images.menu} alt='cart'></img>
                            </a>
                            <div className='right-links flex-center header-containers-gap align-center' style={{width:'30%'}}>
                                <Link to='/cart/' className='icon-link'><img className='small-logo-header' src={!header ? images.bolsaNaranja : images.bolsa} alt='cart'></img></Link>
                                <a className={!header ? 'icon-link icons-svg-dimensions icon-margin-fit simple-flex' : 'icon-link icons-svg-scroll icon-margin-fit simple-flex'} href='/'><FaInstagram/></a>
                                <a className={!header ? 'contact-btn' : 'scroll-contact-btn'} href='/'>Contactanos</a>
                            </div>
                        </div>
                    </div>
                    <Sidebar togg={toggle} func={setSidebar} kind='search' side='left' justmobile={false}/>
                    <Sidebar togg={menu} func={setMenuu} kind='menu' side='right' justmobile={true}/>
                </>
            ) : (
                <>
                    <div className={`static-header ${header ? 'fixed' : ''}`}>
                        <div className='simple-flex space-between header-align align-center'>
                            <a className='icon-link mobile-show' href='/' onClick={setSidebar}>
                                <img className='mobile-header-icons' src={images.search} alt='cart'></img>
                            </a>
                            <div className='flex-center header-containers-gap left-links-width' style={{width:'38%'}}>
                                <Link className='scroll-link' to='/'>Inicio</Link>  
                                <Link className='scroll-link' to='/products/all'>Productos</Link>                      
                                <a className='scroll-link' href='/'>Categorias</a>                       
                                <a className='scroll-link' href='/' onClick={setSidebar}>Buscar</a>  
                            </div>
                            <picture className={'logo-header-container-scroll align-logo-center'}>
                                <img className='logo-header' src={images.logoNegro} alt='logo'></img>
                            </picture>
                            <a className='icon-link mobile-show' href='/' onClick={setMenuu}>
                                <img className='mobile-scroll-menu' src={images.menu} alt='cart'></img>
                            </a>
                            <div className='right-links flex-center header-containers-gap align-center' style={{width:'30%'}}>
                                <Link to='/cart/' className='icon-link'><img className='small-logo-header' src={images.bolsa} alt='cart'></img></Link>
                                <a className='icon-link icons-svg-scroll icon-margin-fit simple-flex' href='/'><FaInstagram/></a>
                                <a className='scroll-contact-btn' href='/'>Contactanos</a>
                            </div>
                        </div>
                    </div>
                    <Sidebar togg={toggle} func={setSidebar} kind='search' side='left' justmobile={false}/>
                    <Sidebar togg={menu} func={setMenuu} kind='menu' side='right' justmobile={true}/>
                </>
            )}

            
        </>
    )
}

export default Header