import { useContext, useEffect, useState } from "react";
import ProductContext from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserProfile = () => {
  const [openOrders, setOpenOrders] = useState(false);
  const { addressData, deleteAddress, orderData } = useContext(ProductContext);

  return (
    <>
      <Header />
      <div className="container my-4">
        <h2>User Profile</h2>
        <section>
          <h5 className="">Personal Info</h5>
          <div className="card p-3 my-3">
            <p className="fs-5 fw-semibold">Shubhangi Wadekar</p>
            <p className="fs-5 mb-1">shubhangi@email.com</p>
            <p className="fs-5 mb-1">9876543210</p>
            <p>A-304, Grace Residency, Fergusson College Rd, Shivajinagar, Pune, Maharashtra, 411004</p>
          </div>
        </section>

        <section>
          <div>
            <h5>Saved Addresses</h5>
            <ul className="list-group">
              {addressData?.data?.address?.map((address) => (
                <li
                  key={address._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div>
                    <p className="fs-6 fw-semibold">
                      {address.receiverName} - {address.phoneNumber}
                    </p>
                    <p className="fs-6 mb-0">
                      {address.houseNumber}, {address.apartment}, {address.city}
                    </p>
                    <p className="mb-0 fs-6">{address.postal}</p>
                    <p className="mb-0 fs-6">
                      {address.state}, {address.country}
                    </p>
                  </div>

                  <div>
                    {" "}
                    <button
                      className="btn btn-danger me-2"
                      onClick={() => deleteAddress(address._id)}
                    >
                      Remove Address
                    </button>
                    <Link to={`/updateaddress/${address._id}`} className="btn btn-info my-3">
                      Update Address
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            {" "}
            <Link to="/address" className="btn btn-success my-3">
              Add New Address
            </Link>
          </div>
        </section>

        <section onClick={() => setOpenOrders(!openOrders)}>
          <h4 className="btn btn-primary ">
            {openOrders ? "Hide Orders" : "See Past Orders"}
          </h4>

          {openOrders && (
            <ul className="list-group ">
              {orderData?.data?.orders?.map((order) => (
                <li
                  key={order._id}
                  className="list-group-item border-3 mb-3 d-flex justify-content-around row"
                >
                  <div className="col-12 col-md-8">
                    <div className="row">
                      {order.items.map((item) => (
                        <div key={item.product._id} className="col-12 col-md-4">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="img-fluid object-fit-cover w-25"
                          />
                          <p className="mt-2">{item.product.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="col-12 col-md-4">
                    <div>
                      <p className="fw-semibold">
                        Receiver: {order.address?.receiverName}
                      </p>

                      <p className="fw-bold mt-2">
                        Total Amount: ₹{order.totalAmount}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;
