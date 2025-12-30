import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faFilter, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import { useSearchParams } from 'react-router-dom';
import { useToast } from '../context/ToastContext';

const MoreCollections = () => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [collectionItems, setCollectionItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Available categories based on product data
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'crochet', name: 'Crochet Items' },
    { id: 'home-decor', name: 'Home Decor' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'toys', name: 'Toys' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'bags', name: 'Bags' }
  ];

  // Update URL when selected category changes
  useEffect(() => {
    if (selectedCategory && selectedCategory !== 'all') {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`);

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const products = await response.json();

        // Transform backend data for frontend usage
        const transformedProducts = products.map(product => ({
          ...product,
          id: product._id,
          imageElement: product.imageUrl ? (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL1}${product.imageUrl}`}
              alt={product.title}
              className="w-full h-full object-cover"
              style={{ maxHeight: '200px' }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )
        }));

        setCollectionItems(transformedProducts);
      } catch (err) {
        console.error(err);
        setError('Unable to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  // Filter products based on selected category and search query
  const filteredProducts = collectionItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || 
      (item.category && item.category.toLowerCase().includes(selectedCategory)) ||
      item.title.toLowerCase().includes(selectedCategory);
    
    const matchesSearch = searchQuery === '' || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Loading state
  if (loading) {
    return (
      <section className="w-full py-24 text-center" style={{ background: '#e6ddc5' }}>
        <p className="text-2xl" style={{ color: '#75785b' }}>
          Loading products...
        </p>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="w-full py-24 text-center" style={{ background: '#e6ddc5' }}>
        <p className="text-xl text-red-600">{error}</p>
      </section>
    );
  }

  return (
    <section
      id="more-collections"
      className="w-full py-16 md:py-24 px-4 md:px-8"
      style={{ background: '#e6ddc5' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className="font-serif text-4xl md:text-5xl mb-4"
            style={{ color: '#75785b' }}
          >
            More Collections
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{ color: '#75785b', opacity: 0.8 }}
          >
            Explore our diverse range of handcrafted products
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-12" style={{ background: 'rgba(232, 189, 125, 0.2)', borderRadius: '1.5rem', padding: '1.5rem' }}>
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg font-sans text-sm font-medium transition-all"
              style={{ background: '#75785b', color: '#e6ddc5' }}
            >
              <FontAwesomeIcon icon={showFilters ? faTimes : faFilter} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Filters Container */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block`}>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search Input */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg font-sans text-base"
                  style={{ 
                    background: '#e6ddc5', 
                    color: '#75785b', 
                    border: '2px solid rgba(117, 120, 91, 0.2)',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Category Filter */}
              <div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg font-sans text-base"
                  style={{ 
                    background: '#e6ddc5', 
                    color: '#75785b', 
                    border: '2px solid rgba(117, 120, 91, 0.2)',
                    outline: 'none'
                  }}
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>


          </div>
        </div>

        {/* Products Count */}
        <div className="mb-8 text-center">
          <p className="font-sans text-lg" style={{ color: '#75785b' }}>
            Showing {filteredProducts.length} of {collectionItems.length} products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-sans" style={{ color: '#75785b' }}>
              No products found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map(item => (
              <div
                key={item.id}
                className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                style={{ background: 'rgba(232, 189, 125, 0.2)' }}
              >
                {/* Image */}
                <div className="p-6 aspect-square flex items-center justify-center" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {item.imageElement}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3
                    className="font-serif text-lg md:text-xl mb-2 line-clamp-1"
                    style={{ color: '#75785b' }}
                  >
                    {item.title}
                  </h3>

                  <p
                    className="text-sm mb-4 min-h-[3rem] line-clamp-2"
                    style={{ color: '#75785b', opacity: 0.7 }}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span
                      className="font-serif text-xl font-bold"
                      style={{ color: '#75785b' }}
                    >
                      ₹{item.price.toLocaleString('en-IN')}
                    </span>

                    <button
                      onClick={() => {
                        addToCart(item);
                        addToast(`${item.title} added to cart!`, 'success');
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-transform hover:scale-105 active:scale-95"
                      style={{ background: '#75785b', color: '#e6ddc5' }}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MoreCollections;