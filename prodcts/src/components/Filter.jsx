// src/components/Filter.js
import React, { useState } from 'react';

const Filter = ({ categories, setFilter }) => {
  const [category, setCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFilter(prevFilter => ({ ...prevFilter, category: e.target.value }));
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    setFilter(prevFilter => ({ ...prevFilter, maxPrice: value || Infinity }));
  };

  return (
    <div className="filter">
      <label>
        Category:
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </label>
      <label>
        Max Price:
        <input
          type="number"
          value={maxPrice}
          onChange={handlePriceChange}
          placeholder="No limit"
        />
      </label>
    </div>
  );
};

export default Filter;
