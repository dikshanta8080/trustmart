function CategorySelect({ handleChange }) {
  return (
    <select name="category" onChange={handleChange}>
      <option value="">Select Category</option>
      <option>Smartphone</option>
      <option>Laptop</option>
      <option>Vehicle</option>
      <option>Furniture</option>
      <option>Electronics</option>
    </select>
  );
}

export default CategorySelect;