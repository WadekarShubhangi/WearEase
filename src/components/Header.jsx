import { useContext } from "react";
import { Link, useLocation} from "react-router-dom";
import ProductContext from "../contexts/ProductContext";

const Header = () => {
  const location = useLocation();
  // const search = location.pathname === "/productlisting";
  const showSearch = location.pathname.includes("/product")

  const { wishlistData, cartData, handleSearchChange } = useContext(ProductContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary sticky-top mb-2">
      <div className="container-md d-flex align-items-center">
        {/* 1 */}
        <Link className="navbar-brand fw-semibold text-secondary" to="/">
          WearEase
        </Link>

        {/* 2 */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 3 */}
       
        <div className="collapse navbar-collapse" id="navbarContent">
           {showSearch &&
          <div className="mx-auto my-2 my-lg-0">
            <form role="search">
              <div className="input-group">
                <i
                  className="bi bi-search input-group-text"
                  id="basic-addon1"
                ></i>
                <input
                  type="text"
                  className="form-control border-start-0"
                  placeholder="Search products"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div> }
          <div className="ms-auto gap-4 d-flex align-items-center">
            <Link to="/userprofile">
              <button className="btn btn-secondary px-3 py-1">
                <i className="bi bi-person"></i>
                 {" "} Profile
              </button>
            </Link>

            <Link
              to="/wishlist"
              className="text-decoration-none text-dark position-relative"
            >
              <i className="bi bi-heart me-1"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {wishlistData?.data?.wishlist?.products.length || 0}
              </span>
            </Link>

            <Link to="/cart" className="text-decoration-none text-dark">
              <span className="position-relative me-3">
                <i className="bi bi-cart me-1"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartData?.data?.cart?.products.length || 0}
                </span>
              </span>
              Cart
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
