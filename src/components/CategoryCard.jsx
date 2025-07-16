import { useContext } from 'react';
import ProductContext from "../contexts/ProductContext";
import {Link} from 'react-router-dom'

const CategoryCard = () => {
 const {categoryData, categoryLoading} = useContext(ProductContext)
  return (
    <div className="my-3">
      {categoryLoading && <p>Loading...</p>}
      <div className="row">
        {categoryData?.data?.categories?.length > 0 &&
          categoryData.data.categories.map((item) => (
            <div className="col-sm-3 col-6 mb-3" key={item._id}>
              <Link to={`/productListing?category=${item.name}`}>
              <div className="card text-bg-dark position-relative border-0 category-card">
                <img
                  src={item.image}
                  className="card-img img-fluid object-fit-cover"
                  alt={`${item.name} image`}
                />
                <div className="card-img-overlay">
                  <p className="card-text text-center position-absolute top-50 start-50 translate-middle bg-light w-100 text-dark">
                    {item.name}
                  </p>
                </div>
              </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryCard;
