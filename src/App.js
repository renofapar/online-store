import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Checkout } from "./scenes/checkout/Checkout";
import { Confirmation } from "./scenes/checkout/Confirmation";
import { ItemDetails } from "./scenes/details/ItemDetails";
import CartMenu from "./scenes/global/CartMenu";
import { NavBar } from "./scenes/global/NavBar";
import {Home} from './scenes/home/Home';
import {Footer} from './scenes/global/Footer'
import { TestFirebase } from "./components/TestFirebase";
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => {
  return <div className="app">
    <BrowserRouter>
    <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="item/:itemId" element={<ItemDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="checkout/success" element={<Confirmation />} />
        <Route path="test" element={<TestFirebase />} />
      </Routes>
      <CartMenu />
      <Footer />
    </BrowserRouter>
  </div>;
};

export default App;
