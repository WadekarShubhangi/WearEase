import { useContext, useEffect } from "react";
import ProductContext from "../contexts/ProductContext";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UpdateAddress = () => {
  const {
    addressData,
    formData,
    setFormData,
    addressHandleChange,
    updateAddress,
  } = useContext(ProductContext);

  const { addressId } = useParams();

  useEffect(() => {
    const selected = addressData?.data?.address?.find(
      (addr) => addr._id === addressId
    );
    if (selected) setFormData(selected);
  }, [addressId, addressData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAddress(addressId, formData);
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2>Edit Address</h2>
        <form onSubmit={handleSubmit} className="card p-4">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="receiverName"
                className="form-control"
                value={formData.receiverName}
                onChange={addressHandleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                name="phoneNumber"
                className="form-control"
                value={formData.phoneNumber}
                onChange={addressHandleChange}
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label">House Number</label>
              <input
                type="text"
                name="houseNumber"
                className="form-control"
                value={formData.houseNumber}
                onChange={addressHandleChange}
              />
            </div>
            <div className="col-md-8 mb-3">
              <label className="form-label">Apartment</label>
              <input
                type="text"
                name="apartment"
                className="form-control"
                value={formData.apartment}
                onChange={addressHandleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                className="form-control"
                value={formData.city}
                onChange={addressHandleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Postal</label>
              <input
                type="text"
                name="postal"
                className="form-control"
                value={formData.postal}
                onChange={addressHandleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                className="form-control"
                value={formData.state}
                onChange={addressHandleChange}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                className="form-control"
                value={formData.country}
                onChange={addressHandleChange}
              />
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success">
              Update Address
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

export default UpdateAddress;
