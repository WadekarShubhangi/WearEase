import { Link } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";

const CartPlaceOrderCard = () => {
  const { calculateTotals } = useContext(ProductContext);
  const {
    totalOriginalPrice,
    discount,
    deliveryCharges,
    totalAmount,
    totalItems,
  } = calculateTotals();

  return (
    <div className="card p-3">
      <h6 className="fw-bold mb-3">PRICE DETAILS</h6>
      <div className="d-flex justify-content-between">
        <p>Price ({totalItems} items)</p>
        <p>₹{totalOriginalPrice}</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Discount</p>
        <p className="text-success">- ₹{discount}</p>
      </div>
      <div className="d-flex justify-content-between">
        <p>Delivery Charges</p>
        <p>₹{deliveryCharges}</p>
      </div>
      <hr />
      <div className="d-flex justify-content-between fw-bold">
        <p>Total Amount</p>
        <p>₹{totalAmount}</p>
      </div>
      <p className="text-success small mt-2">
        You will save ₹{discount} on this order
      </p>
      <Link to="/orders" className="btn btn-primary w-100 mt-3">
        Check Out
      </Link>
    </div>
  );
};

export default CartPlaceOrderCard;
