import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItemCards from "../components/CartItemCards"
import CartPlaceOrderCard from "../components/CartPlaceOrderCard";

const Cart = () => {
  const { cartData } = useContext(ProductContext);
  const cartItems = cartData?.data?.cart?.products || [];



  return (
    <>
      <Header />
      <main className="container my-4">
        <h5 className="text-center fw-bold my-3">
          My Cart ({cartItems.length})
        </h5>
        <div className="row">
          <div className="col-12 col-md-6">
            <CartItemCards/>
          </div>
          <div className="col-12 col-md-6">
            {cartItems.length > 0 && <CartPlaceOrderCard/>}
            
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Cart;
