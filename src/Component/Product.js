import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const loaderRef = useRef(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (nextPage){
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/products?page=${page}&range=${selectedPriceRange}`);
          setProductList(prevProducts => [...prevProducts, ...response.data.products]);
  
          if(!response.data.products.length > 0){
            setNextPage(false)
          }
  
          const uniqueBrands = new Set([...allBrands, ...response.data.brands]);
          setAllBrands(Array.from(uniqueBrands));
  
          const uniqueCategories = new Set([...allCategories, ...response.data.categories]);
          setAllCategories(Array.from(uniqueCategories));
  
          setPage(prevPage => prevPage + 1);
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchData();
        }
      },
      { threshold: 1 }
    );
  
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [page, selectedPriceRange]);

  const handleBrandChange = e => {
    setSelectedBrand(e.target.value);
    setSelectedCategory('');
  };

  const handleCategoryChange = e => {
    setSelectedCategory(e.target.value);
    setSelectedBrand('');
  };

  const handlePriceRangeChange = e => {
    setSelectedPriceRange(e.target.value);
  };

  useEffect(() => {
    let filtered = productList;

    if (selectedBrand) {
      filtered = filtered.filter(product => product.brand === selectedBrand);
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (selectedPriceRange) {
      switch (selectedPriceRange) {
        case '1':
          filtered = filtered.filter(product => product.price >= 2500 && product.price < 3500);
          break;
        case '2':
          filtered = filtered.filter(product => product.price >= 3500 && product.price < 4500);
          break;
        case '3':
          filtered = filtered.filter(product => product.price >= 4500 && product.price < 5500);
          break;
        case '4':
          filtered = filtered.filter(product => product.price >= 5500 && product.price < 6500);
          break;
        default:
          break;
      }
    }

    setFilteredProducts(filtered);
  }, [selectedBrand, selectedCategory, productList, selectedPriceRange]);

  return (
    <>
      <Navbar />
      <section
        className="w-full mx-auto bg-nordic-gray-light flex pt-12 md:pt-0  md:items-center bg-cover bg-right"
        style={{
          maxWidth: 1600,
          height: "32rem",
          backgroundImage:
            'url("https://images.unsplash.com/photo-1422190441165-ec2956dc9ecc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80")'
        }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col w-full lg:w-1/2 justify-center items-start  px-6 tracking-wide">
            <h1 className="text-black text-2xl my-4">
              Stripy Zig Zag Jigsaw Pillow and Duvet Set
            </h1>
            <a
              className="text-xl inline-block no-underline border-b border-gray-600 leading-relaxed hover:text-black hover:border-black"
              href="#"
            >
              products
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 ">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1 bg-white shadow-lg">
  <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
    <a
      className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
      href="#"
    >
      Store
    </a>
    <div className="flex items-center" id="store-nav-content">
      <div className="pl-3 inline-block no-underline hover:text-black">
        <div className="flex justify-center my-4">
          <select
            id="brand-select"
            className="selector-input px-4 py-2 border rounded-md"
            value={selectedBrand}
            onChange={handleBrandChange}
          >
            <option value="">All Brands</option>
            {allBrands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="pl-3 inline-block no-underline hover:text-black">
        <div className="flex justify-center my-4">
          <select
            id="category-select"
            className="selector-input px-4 py-2 border rounded-md"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="pl-3 inline-block no-underline hover:text-black">
        <div className="flex justify-center my-4">
          <select
            id="price-range-select"
            className="selector-input px-4 py-2 border rounded-md"
            value={selectedPriceRange}
            onChange={handlePriceRangeChange}
          >
            <option value="">All Prices</option>
            <option value="1">$2500 - $3500</option>
            <option value="2">$3500 - $4500</option>
            <option value="3">$4500 - $5500</option>
            <option value="4">$5500 - $6500</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</nav>

          <div className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
  {filteredProducts.map(product => (
    <div key={product.id} className="group relative overflow-hidden bg-white rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
      <Link to={`/productDetails/${product.id}`} className="flex flex-col h-full justify-between">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden">
          <img src={product.image} alt={product.name} className="object-cover object-center w-full h-full transition duration-300 transform group-hover:scale-110" />
          <img src={product.image_back} alt={product.name} className="absolute top-0 left-0 w-full h-full object-cover object-center transition duration-300 opacity-0 group-hover:opacity-100" />
        </div>

        <div className="p-4">
          <h3 className="mt-1 text-sm font-medium text-gray-600">{product.name}</h3>
          <p className="mt-1 text-sm font-medium text-gray-600">{product.brand}</p>
          <p className="mt-1 text-sm font-medium text-gray-600">{product.price}</p>
          <p className="mt-1 text-sm font-medium text-gray-600">After discount price: {product.after_discount_price}</p>
        </div>
      </Link>
    </div>
  ))}
</div>

          <div ref={loaderRef} className="text-center">
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Product;
