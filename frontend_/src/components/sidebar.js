import { useState } from "react";
import images from "../images/exporting.js";
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";

const Sidebar = ({togg, func, kind, side, justmobile}) => {

    const [inputValue, setInputValue] = useState('')
    const [results, setResults] = useState([])
    const [clear, setClear] = useState(true)

    const InputChange = (e) => {
        setInputValue(e.target.value)
    }
    
    const handleSearch = (e) => {
        e.preventDefault();
        fetch(`https://casacondimentos.com//api/consulta/?search=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            setResults(data)
            setClear(false)
        })
        .catch(error => {
            console.error(error)
        })
    }

    return(
        <>
            <div className={`${side === 'left' ? 'sidebar' : 'right-sidebar'} ${justmobile ? 'hide-desktop' : 'show-in-all'} ${kind === 'search' ? 'sidebar-search' : 'sidebar-menu'} ${togg ? 'active' : ''}`}>
                <div className="flex-center">
                    <div className="sidebar-search-logo"><img className="logo-header" src={images.logoNegro} alt="logo"></img></div>
                </div>
                {kind === 'search'  
                    ? (
                    <>
                        <form className="search-form flex-center" onSubmit={handleSearch}>
                            <input required type="text" placeholder="Buscar" value={inputValue} className="search-input" onChange={InputChange}></input>
                            <button type="submit" className="submit-button alternative-product-title-position"><FaSearch/></button>
                        </form>
                        <div className="search-results-container">
                            { results.length > 0 ? results.map((result) => {
                                return(
                                    <Link key={result.id} to={`/product/${result.id}`} className="search-result-link">
                                        <div  className="search-results-flex-h">
                                            <div className='search-result-img-container'>
                                                <img className="search-img" src={result.image} alt='prueba'></img>
                                            </div>
                                            <div className="flex-col">
                                                <h4 className="search-name">{result.name}</h4>
                                                <h4 className="search-price">${result.price}</h4>
                                                <p className="search-description">{result.description}</p>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }) : (
                                !clear ? <h4 className="search-empty-result">No se ha encontrado resultados</h4> : ''
                            )}
                        </div>
                    </>
                    )
                    : (
                        <div className="flex-col menu-component">
                            <Link className='sidebar-link' to='/'>Inicio</Link>    
                            <Link className='sidebar-link' to='/products/all'>Productos</Link>                                            
                            <Link to='/cart' className='sidebar-link'>Carrito</Link>
                        </div>
                    )
                }
            </div>
            <div className={`${togg ? 'sidebar-overlay active' : 'sidebar-overlay' } ${justmobile ? 'hide-desktop' : 'show-in-all'}`} onClick={func}></div>
        </>
    )
}

export default Sidebar