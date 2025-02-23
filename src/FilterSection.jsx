const FilterSection = ({ categories, selectedCategory, onCategoryChange }) => (
    <div className="filter-section">
      <h2 className="filter-title">Categories</h2>
      <div className="category-buttons">
        <button
          onClick={() => onCategoryChange(null)}
          className={`category-btn ${selectedCategory === null ? 'active' : ''}`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );

  export default FilterSection;