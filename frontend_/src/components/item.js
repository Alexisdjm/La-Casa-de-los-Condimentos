import Featured from "./featured"
import images from "../images/exporting"
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ReactComponent as ShoppingCart } from '../images/svgs/shopping-cart-black.svg'
import { Toaster, toast } from 'sonner'

const Item = () => {

    const location = useLocation()
    const [url, setUrl] = useState(location.pathname)

    const [cantidad, setcantidad] = useState(1)
    const [gramos, setGramos] = useState(false)
    const [product, setProduct] = useState([{
        id: '1', 
        name: 'name', 
        price: '9.99', 
        category: 'cat', 
        session: {in_cart: false},
        description: 'description',
        image: images.cuatrocondimentos
    }])

    const [total, setTotal] = useState(0)
    const [precio, setPrecio] = useState(0)

    const [category, setCategory] = useState('')
    const [incart, setIncart] = useState(false)

    const array = [
        ['co', 'Condimentos y Especias'],
        ['bk', 'Productos de Repostería'],
        ['nt', 'Frutos Secos'],
        ['gr', 'Granos y Cereales'],
        ['gc', 'Víveres'],
        ['ch', 'Químicos y Más']
    ]

    const csrftoken = Cookies.get('csrftoken');

    const Buy = () => {
        const sendMessage = () => {
            let num = '584127615686'
            let message = [
                `Buenas tardes, me gustaria comprar el siguiente producto: \nNombre: ${product[0].name}, \nCantidad: ${!product[0].Pgramos ? cantidad + ' unidades' : gramos ? cantidad*100 + ' gr' : cantidad + ' kg'}, \ntotal: $${total}`
            ]
            const encodedMessage = encodeURIComponent(message);
            const url = `https://api.whatsapp.com/send?phone=${num}&text=${encodedMessage}`;
            window.location.href = url;
        }

        return(
            <>
                <button className="purchase-btn" onClick={sendMessage}>Comprar</button>
            </>
        )
    }

    function deleteCart(url) {
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json',
                "X-CSRFToken": csrftoken,
            }
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    }

    function AddToCart(url, id, cantidad, medida, precio) {
        fetch(url, {
            method: "POST",
            credentials: 'include',
            headers:{
                'Content-Type':'application/json',
                "X-CSRFToken": csrftoken,
            },
            body: JSON.stringify({
                'product_id': id,
                'precio': precio,
                'cantidad': cantidad,
                'gramos': medida
            }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));

    }

    function fetchData(url) {
        fetch(url)
        .then(data => data.json())    
        .then(json => {
            if ('detail' in json) {
                window.location.pathname = '/404'
            } else {
                for (let i = 0; i < array.length; i++) {
                    if (array[i][0] === json[0].category) {
                        setCategory(array[i][1])
                    }
                } 
                setProduct(json)
                setIncart(json[0].session.in_cart)
                setPrecio(json[0].price)
                setTotal(json[0].price)
            }
        })
    }

    useEffect(() => {
        window.scrollTo(0,0)
        setUrl(location.pathname)
        fetchData(`https://casacondimentos.com//api/item/${url.split('/').at(-1)}/`) 
        setcantidad(1)
        setGramos(false)
        
    }, [location.pathname, url])

    return(
        <>
            <Toaster expand={true} closeButton position="top-right"/>
            <div className="horizontal-padding">
                <div className="single-product-page">
                    <div className="single-product-img flex-col center align-center">
                        <img src={product[0].image} alt={product[0].name}></img>
                    </div>
                    <div className="single-product-info">
                        <div className="product-info-container">
                            <h4>{category}</h4>
                            <h1>{product[0].name}</h1>
                            {!incart ? '' : (<h5 className="in-cart">En el carrito <ShoppingCart/></h5>)}
                            <p className="product-description">{product[0].description}</p>
                            <p className="price-description">Precio: <strong>${product[0].price}</strong></p>
                        </div>
                    </div>
                    <div className='flex-center purchase-box-container'>
                        <div className="purchase-box flex-col">
                            {product[0].Pgramos > 0
                            ? (
                                <div id="desktop-gr">
                                <h4 className="purchase-caption">En gramos</h4>
                                <label className="toggle-switch">
                                <input type="checkbox" checked={gramos} onChange={(e) => {
                                    if (e.target.checked) {
                                        setGramos(true)
                                        setPrecio(product[0].Pgramos)
                                        setTotal(product[0].Pgramos)
                                    } else {
                                        setGramos(false)
                                        setPrecio(product[0].price)
                                        setTotal(product[0].price)
                                    }
                                    setcantidad(1)
                                }}></input>
                                <div className="toggle-switch-background">
                                    <div className="toggle-switch-handle"></div>
                                </div>
                                </label>
                            </div>
                            ) : ''}
                            
                            <div>
                                <h4 className="purchase-caption">Cantidad</h4>
                                <div className="flex-center" style={{padding: '0 0 10px'}}>
                                    <button className='menos-btn' onClick={() => {
                                        cantidad <= 1 ? setcantidad(1) : setcantidad(prevValue => prevValue - 1)
                                        total <=0 ? setTotal(precio) : setTotal(prevTotal => prevTotal - precio)    
                                    }}>-</button>
                                    <input className="cantidad" value={gramos ? cantidad*100 : cantidad} readOnly type="text"></input>
                                    <button className='mas-btn' onClick={() => {
                                        setcantidad(prevValue => prevValue + 1)
                                        setTotal(prevTotal => prevTotal + precio) 
                                        }}>+</button>
                                </div>
                            </div>
                            <div className="price-align">
                                <div className="simple-flex space-between">
                                    <h4 className="price-spec">Precio</h4>
                                    <h4 className="price-numbers">${precio > 0 ? precio.toFixed(2) : product[0].price}</h4>
                                </div>
                                <hr></hr>
                                <div className="simple-flex space-between">
                                    <h4 className="price-spec">Total</h4>
                                    <h4 className="price-numbers">${total > 0 ? total.toFixed(2) : product[0].price}</h4>
                                </div>
                            </div>
                            <div className='flex-col buttons-container'>
                                <button className='cart-btn' onClick={() => { 
                                    if (!incart) {
                                        AddToCart('https://casacondimentos.com//api/cart/', product[0].id, cantidad, gramos, total)
                                        setIncart(true)
                                        toast('Producto agregado al carrito')

                                    } else {
                                        deleteCart(`https://casacondimentos.com//api/cart/${product[0].id}/`)
                                        setIncart(false)
                                        toast('Producto eliminado del carrito')
                                    }}}>{incart ? 'Eliminar del Carrito' : 'Agregar al Carrito'}</button>
                                <Buy/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Featured css='flex-col align-center section-margin'/>
        </>
    )
} 
export default Item