import { useContext } from "react";
import { Link } from "react-router-dom";
import ProductContext from "../contexts/ProductContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Address = () => {
  const { addressHandleChange, addressHandleSubmit, formData, setFormData } =
    useContext(ProductContext);

  return (
    <>
      <Header />

      <div className="container my-4">
        <h2>Add New Address</h2>
        <form onSubmit={addressHandleSubmit} className="card p-4">
            <div className="mb-3">
              <label className="form-label fw-semibold">Name:</label>
              <input
                type="text"
                name="receiverName"
                className="form-control"
                value={formData.receiverName}
                onChange={addressHandleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={addressHandleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">House Number:</label>
              <input
                type="text"
                name="houseNumber"
                className="form-control"
                value={formData.houseNumber}
                onChange={addressHandleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Apartment:</label>
              <input
                type="text"
                name="apartment"
                className="form-control"
                value={formData.apartment}
                onChange={addressHandleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">City:</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={addressHandleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Postal Code:</label>
              <input
                type="text"
                name="postal"
                className="form-control"
                value={formData.postal}
                onChange={addressHandleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">State:</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={addressHandleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Country:</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={formData.country}
                onChange={addressHandleChange}
                required
              />
            </div>
         

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Add Address
            </button>
            <Link type="button" className="btn btn-warning" to="/userProfile">
              Go To Profile Page
            </Link>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Address;
