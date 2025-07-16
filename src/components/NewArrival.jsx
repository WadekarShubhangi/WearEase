const NewArrival = ({image}) => {
    return (
        <>
        <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 d-flex align-items-center p-4">
                    <img
                      src={image}
                      className="img-fluid object-fit-cover"
                      alt="Summer Collection Image"
                    />
                  </div>
                  <div className="col-md-8">
                    <div
                      className="card-body d-flex flex-column justify-content-between"
                      style={{ height: "100%" }}
                    >
                      <p className="card-text">
                        <small className="text-body-secondary">
                          NEW ARRIVALS
                        </small>
                      </p>
                      <div>
                        <h5 className="card-title">Summer Collection</h5>
                        <p className="card-text lh-1.5">
                          Checkout the most latest summer collection from our
                          collection to stay stylish.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        </>
    )
}

export default NewArrival;