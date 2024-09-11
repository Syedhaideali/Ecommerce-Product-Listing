// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Filter from './components/Filter';

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState({ category: '', maxPrice: Infinity });

  useEffect(() => {
    // Fetch data from FakeStore API
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setFilteredProducts(response.data);

        // Extract unique categories
        const uniqueCategories = [...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filters when filter state changes
    const applyFilter = () => {
      const { category, maxPrice } = filter;
      const newFilteredProducts = products.filter(product => {
        const meetsCategory = category ? product.category === category : true;
        const meetsPrice = product.price <= maxPrice;
        return meetsCategory && meetsPrice;
      });
      setFilteredProducts(newFilteredProducts);
    };

    applyFilter();
  }, [filter, products]);

  return (
    <div className="App">
      <h1>E-commerce Product Listing</h1>
      <Filter categories={categories} setFilter={setFilter} />
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default App;
