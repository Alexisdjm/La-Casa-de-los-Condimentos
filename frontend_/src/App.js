import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import For0For from './components/404.js';
import SingleProduct from './components/singleProduct';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route exact path='/products/:category' element={<Products/>}/>
        <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/:404' element={<For0For/>}/>
        <Route path='/admin' element=''/>
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
