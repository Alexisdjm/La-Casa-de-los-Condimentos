import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import Cookies from 'js-cookie';
import { Toaster, toast } from 'sonner'


const CartContent = () => {

    const csrftoken = Cookies.get('csrftoken');

    const [items, setItems] = useState({})
    const [itemsInfo, setItemsInfo] = useState({})
    const [total, setTotal] = useState(0)

    const filteredKeys = ['id', 'cantidad', 'gramos', 'grval', 'kgval'];

    const location = useLocation()

    function fetchData(url) {
        fetch(url)
        .then(data => data.json())    
        .then(json => {
            setItems(json.cart)
            setTotal(json.total)
            console.log(json)
            const filteredObject = {};
            Object.keys(json.cart).forEach(key => {
                filteredObject[key] = {};
                    filteredKeys.forEach(filteredKey => {
                        if (json.cart[key][filteredKey]) {
                            filteredObject[key][filteredKey] = json.cart[key][filteredKey];
                        }
                    });
                });
            setItemsInfo(filteredObject);
        })
    }

    function DeleteFromCart(url) {
        fetch(url, {
            method: 'DELETE',
            credentials: 'include',
            headers:{
                'Content-Type':'application/json',
                "X-CSRFToken": csrftoken,
            },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
    }

    const BuyCart = () => {
        const sendMessage = () => {
            let num = '584129692100'
            let message = [
                `Buen dia, me gustaria comprar los siguientes productos: \n${Object.values(items).map(product => `${product.name} \n cantidad: ${product.gramos ? (parseFloat(product.cantidad)*100) + ' gr' : product.name.includes(' gr') ? product.cantidad + ' unidades' : product.cantidad + 'kg'}`).join("\n ")} \n Total: $${parseFloat(total).toFixed(2)}`
            ]
            const encodedMessage = encodeURIComponent(message);
            const url = `https://api.whatsapp.com/send?phone=${num}&text=${encodedMessage}`;
            window.location.href = url;
        }

        return(
            <>
                <button className="purchase-btn" onClick={sendMessage}>Proceder al Pago</button>
            </>
        )
    }

    const handleDelete = (id) => {
        const newData = Object.keys(items)
          .filter((key) => key !== id)
          .reduce((obj, key) => {
            obj[key] = items[key];
            return obj;
          }, {});
        DeleteFromCart(`https://casacondimentos.com//api/cart/${id}/`)
        setItems(newData);
        toast.message('Producto eliminado', {
            description: 'El producto fue eliminado del carrito',
          })
    };

    useEffect(() => {
        window.scrollTo(0,0)
        fetchData(`https://casacondimentos.com//api/cart/`)  

    }, [location])
    
    return (
        <>
            <Toaster expand={true} closeButton position="top-right"/>
            <div className="svg-next-container">
                <div className="cart-boxes-container">
                    <div className="cart-items-container flex-col">
                        <div className="simple-flex space-between">
                            <h1 className="cart-title">Carrito</h1>
                            <h4 className="cart-box-price-label">Precio</h4>
                        </div>
                        <div className="cart-items-box">
                            { Object.keys(items).length > 0 ? Object.keys(items).map((product) => {
                                const subObjeto = items[product];
                                return(
                                    <div id={product} key={product} className="cart-item">
                                        <div className="cart-item-align">
                                            <label className="container">
                                                <input type="checkbox" checked onChange={() => {
                                                    handleDelete(product) 
                                                    setTotal(prevTotal => prevTotal - subObjeto.price)
                                                }}></input>
                                                <div className="checkmark"></div>
                                            </label>
                                            <img className="cart-item-img" src={subObjeto.image} alt="sample"></img>
                                            <div className="flex-col cart-item-info">
                                                <h4>{subObjeto.name}</h4>
                                                <p>{subObjeto.description}</p>
                                                <h4 className="hidden-price">${parseFloat(subObjeto.price.toFixed(2))}</h4>
                                            </div>
                                            <h4 className="cart-item-price">{subObjeto.gramos 
                                                ? (parseFloat(subObjeto.cantidad)*100) + ' gr' 
                                                : subObjeto.name.includes(' gr') 
                                                    ? subObjeto.cantidad + ' unidades' 
                                                    : subObjeto.cantidad + 'kg'}</h4>
                                            <h4 className="cart-item-price">${parseFloat(subObjeto.price.toFixed(2))}</h4>
                                        </div>
                                    </div>
                                )
                            }) : <h1>No hay productos en el Carrito</h1>}
                        </div>
                        <h4 className="cart-items-total">Subtotal ({Object.keys(items).length > 0 ? Object.keys(items).length : 0} Productos): <strong>${parseFloat(total.toFixed(2))}</strong></h4>
                        <BuyCart/>
                    </div>
                    <div className="checkout-cart-box flex-col">
                        <div className="simple-flex space-between">
                            <h4 className='subtotal'>Subtotal ({Object.keys(items).length > 0 ? Object.keys(items).length : 0} Productos):</h4>
                            <h4 className="cart-item-price">${parseFloat(total.toFixed(2))}</h4>
                        </div>
                        <BuyCart/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartContent