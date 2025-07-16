import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
const Orders = () => {
  const navigate = useNavigate();
  const { addressData, calculateTotals, placeOrder, clearCart } =
    useContext(ProductContext);
  const {
    totalOriginalPrice,
    discount,
    deliveryCharges,
    totalAmount,
    totalItems,
  } = calculateTotals();

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2>Place Your Order</h2>
        <h5>Order Summary</h5>
        <p className="mb-1">Original Price: ₹{totalOriginalPrice}</p>
        <p className="mb-1">Discount: ₹{discount}</p>
        <p className="mb-1">Delivery Charges: ₹{deliveryCharges}</p>
        <p className="mb-1">Total Items : {totalItems}</p>
        <p>
          <strong>Total: ₹{totalAmount}</strong>
        </p>
        <hr />
        <h5>Select Delivery Address</h5>
        <div className="row">
          {addressData?.data?.address?.map((addr) => (
            <div className="col-12 col-md-4" key={addr._id}>
              <div className="card border p-2 mb-2">
                <p className="fw-semibold">
                  {addr.receiverName} - {addr.phoneNumber}
                </p>
                <p className="mb-1">
                  {addr.houseNumber}, {addr.apartment}, {addr.city}
                </p>
                <p className="mb-1">
                  {addr.state}, {addr.country} - {addr.postal}
                </p>
                <button
                  onClick={async () => {
                    await placeOrder(addr._id, navigate);
                    await clearCart()
                    }}
                  className="btn btn-success my-2"
                >
                  Deliver Here & Place Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Orders;
