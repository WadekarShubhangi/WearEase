import Header from "../components/Header";
import Footer from "../components/Footer";
import FilterComponent from "../components/FilterComponent";
import { useEffect, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ProductContext from "../contexts/ProductContext";

const ProductListing = () => {
  const {
    productData,
    setSelectedCategory,
    filteredProducts,
    selectedCategory,
    addToWishlist,
    addToCart,
    searchQuery,
    wishlistData,
    sortOrder,
  } = useContext(ProductContext);
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category, setSelectedCategory]);


  useEffect(() => {
    const baseProducts = category
      ? filteredProducts()
      : productData?.data?.products || [];

    const filtered = baseProducts.filter((item) =>
      item.title.toLowerCase().includes(searchQuery)
    );

    setProducts(filtered);
  }, [
    filteredProducts,
    selectedCategory,
    productData,
    searchQuery,
    category,
    sortOrder,
  ]);

  return (
    <>
      <Header />
      <main className="container-fluid">
        <div className="row gx-4 gy-4">
          <section className="col-sm-3 col-12 bg-body-secondary">
            <FilterComponent />
          </section>
          <section className="col-sm-9 col-12">
            <div className="d-flex align-items-center px-3 py-2">
              <p>
                <b>Showing All Products </b>
              </p>
              <p> (Showing 20 products) </p>
            </div>
            <div>
              <div className="row ">
                {products.length === 0 ? (
                  <p className="text-center">No products found.</p>
                ) : (
                  products.map((item) => {
                    const isWishlisted =
                      wishlistData?.data?.wishlist?.products?.some(
                        (w) => w?._id === item._id
                      );

                    return (
                      <div
                        key={item._id}
                        className="col-12 col-sm-4 col-lg-3 mb-3"
                      >
                        <div className="card h-100 d-flex flex-column">
                          <div className="position-relative">
                            <button
                              className="btn btn-light position-absolute top-0 end-0 m-2 px-2 py-1 rounded-circle                            
                              "
                              onClick={() => addToWishlist(item._id)}
                            >
                              <i
                                className={`bi ${
                                  isWishlisted
                                    ? "bi-heart-fill text-danger"
                                    : "bi-heart"
                                }`}
                              ></i>
                            </button>
                            <Link
                              to={`/productdetails/${item._id}`}
                              className="text-decoration-none"
                            >
                              <img
                                src={item.image}
                                alt={item.title}
                                className="object-fit-cover card-img-top img-fluid"
                              />
                            </Link>
                          </div>
                          <div className="card-body d-flex flex-column justify-content-between text-center p-0 pt-2">
                            <p className="text-center">{item.title}</p>
                            <p className="text-center fw-normal">
                              <strong>₹ {item.discountedPrice}</strong>
                            </p>
                            <p className="text-center fw-normal">
                              Ratings : {item.rating}/5
                            </p>
                            <button
                              className="btn btn-primary w-100 btn-sm rounded-0"
                              onClick={() => addToCart(item._id)}
                            >
                              Add to cart
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};
export default ProductListing;
