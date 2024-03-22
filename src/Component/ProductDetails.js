import React, { useEffect,useRef ,useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';


const ProductDetails = () => {
  const { productId } = useParams(); 
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = imgRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgRef.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  const handleMouseEnter = () => {
    imgRef.current.style.backgroundSize = '150% 150%'; 
  };

  

  const handleMouseLeave = () => {
    imgRef.current.style.backgroundSize = 'cover';
    imgRef.current.style.backgroundPosition = 'center';
  };

  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/products/${productId}`);
        setProduct(response.data.product);
        setRelatedProduct(response.data.related_products)
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct(); 
  }, [productId]); 
  if (!product) {
    return <div>Loading...</div>;
  }
  return (
      <>

      <Navbar/>

      <div className="container px-5 py-12 mx-auto">
  <div className="lg:w-4/5 mx-auto flex flex-wrap items-center justify-between">
  <div className="relative overflow-hidden">
  <img
    ref={imgRef}
    alt="Product"
    src={product.image}
    className="lg:w-[500px] w-full object-cover object-center rounded border border-gray-200 transition-background-size duration-300 transform hover:scale-125"
    onMouseMove={handleMouseMove}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}
  />
</div>
    <div className="w-full lg:w-1/2 lg:pl-10 lg:py-6 mt-6 lg:mt-0">
      <h2 className="text-sm text-gray-500 tracking-widest">{product.brand}</h2>
      <h1 className="text-gray-900 text-3xl font-medium mb-2">{product.category}</h1>
      <div className="flex items-center mb-4">
        <div className="flex mr-2 text-red-500">
          {[...Array(5)].map((_, index) => (
            <svg key={index} fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className={`w-4 h-4 ${index < 4 ? 'mr-1' : ''}`} viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <span className="text-gray-600">{product.reviewsCount} Reviews</span>
      </div>
      <p className="leading-relaxed mb-4">{product.description}</p>
      <div className="flex items-center pb-5 border-b-2 border-gray-200 mb-5">
        <div className="flex mr-4">
          <span className="mr-3">Color</span>
          <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
          {/* Add more color buttons as needed */}
        </div>
        <div className="flex items-center">
          <span className="mr-3">Size</span>
          <div className="relative">
            <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
              <option>SM</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <span className="text-2xl font-medium text-gray-900">${product.price}</span>
        <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">Add to Cart</button>
        <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
          <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <div className="mt-16">
    <h2 className="text-3xl font-medium text-gray-500 text-center mb-8">YOU MAY ALSO LIKE</h2>
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {relatedProduct.map((product) => (
        <div key={product.id} className="group relative">
          <Link to={`/productDetails/${product.id}`}>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 relative">
              <img src={product.image} alt={product.name} className="object-cover object-center w-full h-full lg:w-full lg:h-full" />
              <img src={product.image_back} alt={product.name} className="absolute top-0 left-0 w-full h-full object-cover object-center transition duration-300 opacity-0 group-hover:opacity-100" />
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-600">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{product.brand}</p>
                <p className="mt-1 text-sm text-gray-600">After discount price: {product.discountPrice}</p>
              </div>
              <p className="text-sm font-medium text-gray-600">${product.price}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </div>
</div>
</>


  )
}
export default ProductDetails
