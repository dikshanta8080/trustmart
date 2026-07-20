function ConditionSelect({ handleChange }) {
  return (
    <select name="condition" onChange={handleChange}>
      <option value="">Select Condition</option>
      <option>New</option>
      <option>Like New</option>
      <option>Good</option>
      <option>Fair</option>
      <option>Used</option>
    </select>
  );
}

export default ConditionSelect;