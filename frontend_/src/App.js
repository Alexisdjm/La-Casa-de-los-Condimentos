import './App.css';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import SingleProduct from './components/singleProduct';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products/:category' element={<Products/>}/>
        <Route path='/product/:id' element={<SingleProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </Router>
    </>
  );
}

export default App;
