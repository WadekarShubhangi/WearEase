import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Wishlist = () => {
  const { wishlistData, deleteFromWishlist, moveToCart} = useContext(ProductContext);

  return (
    <>
      <Header />
      <main className="container">
        <p className="my-3">
          <strong>My Wishlist</strong> {wishlistData?.data?.wishlist?.products?.length || 0} items
        </p>
        <div className="row">
          {wishlistData?.data?.wishlist?.products.length > 0 &&
            wishlistData?.data?.wishlist?.products.map((item) => (
              <div key={item._id} className="col-12 col-sm-6 col-md-4 mb-3">
                <div className="card h-100 d-flex flex-column">
                  <div className="position-relative">
                    <button className="btn btn-light position-absolute top-0 end-0 m-2 px-1 py-0 rounded-circle" onClick={() => deleteFromWishlist(item._id)}>
                      <i className="bi bi-x fs-5"></i>
                    </button>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="object-fit-cover card-img-top img-fluid"
                    />
                  </div>
                  <div className="card-body d-flex flex-column justify-content-between text-center p-0 pt-2">
                    <p className="text-center">{item.title}</p>
                    <p className="text-center fw-normal">
                      <strong>₹ {item.discountedPrice}</strong>
                    </p>
                    <button className="btn btn-primary w-100 btn-sm rounded-0" onClick={()=>moveToCart(item._id)}>
                      Move to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Wishlist;
