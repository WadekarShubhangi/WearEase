import { useContext, useEffect, useState } from "react";
import ProductContext from "../contexts/ProductContext";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UpdateAddress = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const {
    addressData,
    formData,
    setFormData,
    addressHandleChange,
    updateAddress,
  } = useContext(ProductContext);

  const { addressId } = useParams();

 useEffect(() => {
  if (!isInitialized) {
    const selected = addressData?.data?.address?.find(
      (addr) => addr._id === addressId
    );
    if (selected) {
      setFormData(selected);
      setIsInitialized(true);
    }
  }
}, [addressId, addressData, isInitialized]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAddress(addressId, formData);
  };

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2>Edit Address</h2>
        <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
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
              Update Address
            </button>
            <Link to="/userProfile" className="btn btn-warning">
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
