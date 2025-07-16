import { useContext } from "react";
import ProductContext from "../contexts/ProductContext";

const FilterComponent = () => {
  const {
    setSortOrder,
    setSelectedRating,
    setSelectedCategoryFromFilter,
    selectedCategoryFromFilter,
    selectedPrice,
    setSelectedPrice,
    clearFilters, setPriceTouched
  } = useContext(ProductContext);


const handleCategoryChange = (e) => {
  const value = e.target.value;
  if (selectedCategoryFromFilter.includes(value)) {
    setSelectedCategoryFromFilter(
      selectedCategoryFromFilter.filter((cat) => cat !== value)
    );
  } else {
    setSelectedCategoryFromFilter([...selectedCategoryFromFilter, value]);
  }
};


  return (
    <>
      <div className="p-3">
        <div className="d-flex justify-content-between">
          <p className="p-0">
            <strong>Filters</strong>
          </p>
          <p
            className="text-decoration-underline cursor-pointer" style={{ cursor: "pointer" }}
            onClick={() => clearFilters()}
          >
            Clear
          </p>
        </div>

        <div className="mb-2">
          <label className="form-label fw-bold">Price</label>
          <div className="d-flex justify-content-between">
            <small>300</small>
            <small>1,100</small>
            <small>2,000</small>
          </div>
          <input
            type="range"
            className="form-range custom-range"
            min="300"
            max="2000"
            step="100"
            value={selectedPrice}
            onChange={(e) => {
              setSelectedPrice(Number(e.target.value));
              setPriceTouched(true);
            }}
          />
          Under ₹ {selectedPrice}
        </div>

        <div className="d-flex flex-column mb-2">
          <strong>Category</strong>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Men"
              id="menClothing"
              checked={selectedCategoryFromFilter.includes("Men")}
  onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor="menClothing">
              Men
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Women"
              checked={selectedCategoryFromFilter.includes("Women")}
  onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor="womenClothing">
              Women
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Boys"
              id="boysClothing"
              checked={selectedCategoryFromFilter.includes("Boys")}
  onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor="boysClothing">
              Boys
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value="Girls"
              id="girlsClothing"
              checked={selectedCategoryFromFilter.includes("Girls")}
  onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor="girlsClothing">
              Girls
            </label>
          </div>
        </div>

        <div className="mb-2">
          <strong>Rating</strong>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="ratings"
              id="radioDefault1"
             
              onChange={() => setSelectedRating(4)}
            />
            <label className="form-check-label" htmlFor="radioDefault1">
              4 Starts & above
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="ratings"
              id="radioDefault2"
              onChange={() => setSelectedRating(3)}
            />
            <label className="form-check-label" htmlFor="radioDefault2">
              3 Starts & above
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="ratings"
              id="radioDefault3"
              onChange={() => setSelectedRating(2)}
            />
            <label className="form-check-label" htmlFor="radioDefault3">
              2 Starts & above
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="ratings"
              id="radioDefault4"
              onChange={() => setSelectedRating(1)}
            />
            <label className="form-check-label" htmlFor="radioDefault4">
              1 Starts & above
            </label>
          </div>
        </div>

        <div className="mb-2">
          <strong>Sort By</strong>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sortBy"
              id="lowToHigh"
              onChange={() => setSortOrder("lowToHigh")}
            />
            <label className="form-check-label" htmlFor="lowToHigh">
              Low to High
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="sortBy"
              id="highToLow"
              onChange={() => setSortOrder("highToLow")}
            />
            <label className="form-check-label" htmlFor="highToLow">
              High To Low
            </label>
          </div>
        </div>
      </div>
    </>
  );
};
export default FilterComponent;
