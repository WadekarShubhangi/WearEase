import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";

const CartItemCards = () => {
  const {
    cartData,
    deleteFromCart,
    moveToWishlist,
    increaseProduct,
    decreaseProduct,
  } = useContext(ProductContext);
  return (
    <>
      {cartData?.data?.cart?.products?.map(({ _id, product, quantity }) => (
        <div key={_id} className="card mb-3">
          <div className="row g-0">
            <div className="col-4 d-flex align-items-center">
              <img
                src={product.image}
                alt={product.title}
                className="object-fit-cover img-fluid h-100"
              />
            </div>
            <div className="col-8">
              <div className="card-body text-center p-4">
                <h5>{product.title}</h5>
                <p>
                  <strong>₹{product.discountedPrice}</strong>{" "}
                  <span className="text-decoration-line-through text-secondary">
                    ₹{product.originalPrice}
                  </span>
                </p>
                <p className="text-secondary">{product.discount}</p>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <button title="Decrease quantity"
                    onClick={() => {
                      decreaseProduct(product._id);
                    }}
                    className="border-0 bg-transparent rounded-circle"
                  >
                    <i className="bi bi-dash-circle"></i>
                  </button>

                  <p className="border border-dark px-3 mb-0 rounded">
                    {quantity}
                  </p>
                  <button title="Increase quantity"
                    onClick={() => {
                      increaseProduct(product._id);
                    }}
                    className="border-0 bg-transparent rounded-circle"
                  >
                    <i className="bi bi-plus-circle"></i>
                  </button>
                </div>
                <button
                  className="btn btn-secondary w-100 btn-sm rounded-0 my-2"
                  onClick={() => {
                    deleteFromCart(product._id);
                  }}
                >
                  Remove from cart
                </button>
                <button
                  className="btn btn-outline-secondary w-100 btn-sm rounded-0"
                  onClick={() => moveToWishlist(product._id)}
                >
                  Move to wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItemCards;
