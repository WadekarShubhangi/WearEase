import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";

const ProductDetails = () => {
  const prodId = useParams();
  const { productData, addToWishlist, addToCart } = useContext(ProductContext);

  const selectedProduct = productData?.data?.products?.find(
    (item) => item._id == prodId.prodId
  );

  const selectedCategory = selectedProduct?.category?.name;

  const similarProducts = productData?.data?.products
    ?.filter(
      (item) =>
        item.category.name === selectedCategory &&
        item._id !== selectedProduct._id
    )
    ?.sort(() => 0.5 - Math.random())
    ?.slice(0, 4);

  return (
    <>
      <Header />
      <main className="container-fluid">
        <div className="card my-3 border-0">
          <div className="row">
            <div className="col-12 col-md-4">
              <div className="position-relative">
                <button
                  className="btn btn-light position-absolute top-0 end-0 m-2 px-2 py-1 rounded-circle"
                  onClick={() => addToWishlist(selectedProduct._id)}
                >
                  <i className="bi bi-heart"></i>
                </button>
                <img
                  src={selectedProduct?.image}
                  alt=""
                  className="img-fluid object-fit-cover"
                />
              </div>
              <div>
                <Link className="btn btn-primary w-100 my-2" to="/orders" onClick={() => {
                    addToCart(selectedProduct._id);
                  }}>Buy Now</Link>
              </div>
              <div>
                <button
                  className="btn btn-secondary w-100 my-2"
                  onClick={() => {
                    addToCart(selectedProduct._id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="col-12 col-md-8">
              <h2 className="display-6 fw-normal">
                {selectedProduct?.brand} {selectedProduct?.title}
              </h2>
              <p>
                {selectedProduct?.rating}

                {[...Array(5)].map((_, index) => {
                  const fullStars = Math.floor(selectedProduct?.rating);
                  const hasHalf = selectedProduct?.rating % 1 >= 0.5;

                  if (index < fullStars) {
                    return (
                      <i
                        key={index}
                        className="bi bi-star-fill text-warning"
                      ></i>
                    );
                  } else if (index === fullStars && hasHalf) {
                    return (
                      <i
                        key={index}
                        className="bi bi-star-half text-warning"
                      ></i>
                    );
                  } else {
                    return (
                      <i key={index} className="bi bi-star text-warning"></i>
                    );
                  }
                })}
              </p>
              <p className="mb-0">
                <strong> ₹ {selectedProduct?.discountedPrice}</strong>
              </p>
              <p className="fw-bold text-secondary">
                {selectedProduct?.discount}
              </p>
              <p className="d-flex">
                <span>Quantity</span>
                <div className="d-flex align-items-center mx-3 gap-2">
                  <i className="bi bi-dash-circle"></i>
                  <p className="border border-dark px-3 mb-0 rounded">2</p>
                  <i className="bi bi-plus-circle"></i>
                </div>
              </p>
              <p>
                {" "}
                Sizes:{" "}
                {selectedProduct?.size.map((item, index) => (
                  <button className="mx-2" key={index}>
                    {item}
                  </button>
                ))}
              </p>
              <hr />
              <div className="d-flex flex-wrap justify-content-center justify-content-md-start">
                <div className="mx-2 d-flex flex-column align-items-center p-2">
                  <span className="d-block py-1">
                    <i className="bi bi-arrow-left-right fs-5"></i>
                  </span>
                  <span>10 days Returnable</span>
                </div>
                <div className="mx-2 d-flex flex-column align-items-center p-2">
                  <span className="d-block py-1">
                    <i className="bi bi-cash fs-5"></i>
                  </span>
                  <span> Pay on Delivery</span>
                </div>
                <div className="mx-2 d-flex flex-column align-items-center p-2">
                  <span className="d-block py-1">
                    <i className="bi bi-truck fs-5"></i>
                  </span>
                  <span>Free Delivery</span>
                </div>
                <div className="mx-2 d-flex flex-column align-items-center p-2">
                  <span className="d-block py-1">
                    <i className="bi bi-credit-card fs-5"></i>
                  </span>
                  <span>Secure Payment</span>
                </div>
              </div>
              <hr />
              <div>
                <h5>Description: </h5>
                <ul>
                  <li>{selectedProduct?.description}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="row">
          {similarProducts?.map((item) => (
            <div className="col-12 col-sm-4 col-md-3" key={item._id}>
              <img
                src={item.image}
                alt={item.name}
                className="object-fit-cover img-fluid"
              />
              <p>{item.title}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};
export default ProductDetails;
