import "./ProductListing.css";
import CategorySelect from "./CategorySelect";
import ConditionSelect from "./ConditionSelect";
import PriceInput from "./PriceInput";
import LocationInput from "./LocationInput";
import ProductDescription from "./ProductDescription";
import ProductImagesUpload from "./ProductImagesUpload";
import ProductVideoUpload from "./ProductVideoUpload";

const ProductForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product Listed Successfully");
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>Create Product Listing</h2>

      <input
        type="text"
        placeholder="Product Title"
        className="input-field"
      />

      <CategorySelect />

      <ConditionSelect />

      <PriceInput />

      <LocationInput />

      <ProductDescription />

      <ProductImagesUpload />

      <ProductVideoUpload />

      <button className="submit-btn">
        Publish Listing
      </button>
    </form>
  );
};

export default ProductForm;