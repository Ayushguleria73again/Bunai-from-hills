import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faArrowRight, faSearch, faTags, faComments } from '@fortawesome/free-solid-svg-icons';

const Blog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'crafts', name: 'Crafts' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'culture', name: 'Culture' },
    { id: 'community', name: 'Community' },
    { id: 'process', name: 'Process' },
    { id: 'festivals', name: 'Festivals' }
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        
        // Transform backend data for frontend usage
        const transformedPosts = data.map(post => ({
          id: post._id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          date: post.date,
          category: post.category,
          readTime: post.readTime,
          image: post.imageUrl ? `${import.meta.env.VITE_API_BASE_URL1}${post.imageUrl}` : null,
          tags: post.tags || []
        }));
        
        setPosts(transformedPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4" style={{ borderColor: '#75785b' }}></div>
          <p className="text-xl" style={{ color: '#75785b' }}>Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4" style={{ color: '#75785b' }}>
            Our Blog
          </h1>
          <p className="font-sans text-lg" style={{ color: '#75785b', opacity: 0.8 }}>
            Discover stories, insights, and inspiration from the world of handcrafted products
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-12" style={{ background: 'rgba(232, 189, 125, 0.2)', borderRadius: '1.5rem', padding: '1.5rem' }}>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 rounded-lg font-sans text-base"
                  style={{ 
                    background: '#e6ddc5', 
                    color: '#75785b', 
                    border: '2px solid rgba(117, 120, 91, 0.2)',
                    outline: 'none'
                  }}
                />
                <FontAwesomeIcon 
                  icon={faSearch} 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2" 
                  style={{ color: '#75785b', opacity: 0.5 }} 
                />
              </div>
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

        {/* Blog Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl font-sans" style={{ color: '#75785b' }}>
              No blog posts found matching your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                style={{ background: 'rgba(232, 189, 125, 0.2)' }}
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                {/* Featured Image */}
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm" style={{ color: '#75785b', opacity: 0.7 }}>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faCalendar} className="text-xs" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FontAwesomeIcon icon={faUser} className="text-xs" />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <h2 
                    className="font-serif text-xl font-semibold mb-3 line-clamp-2 group-hover:opacity-80 transition-opacity"
                    style={{ color: '#75785b' }}
                  >
                    {post.title}
                  </h2>

                  <p 
                    className="text-sm mb-4 line-clamp-3"
                    style={{ color: '#75785b', opacity: 0.8 }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#75785b', opacity: 0.7 }}>
                      <FontAwesomeIcon icon={faTags} />
                      <span>{post.category}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs" style={{ color: '#75785b', opacity: 0.7 }}>
                      <FontAwesomeIcon icon={faComments} className="text-xs" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <button
                className="px-4 py-2 rounded-lg font-sans text-sm transition-all hover:opacity-90"
                style={{ 
                  background: '#75785b', 
                  color: '#e6ddc5' 
                }}
              >
                Previous
              </button>
              <button
                className="px-4 py-2 rounded-lg font-sans text-sm transition-all hover:opacity-90"
                style={{ 
                  background: '#75785b', 
                  color: '#e6ddc5' 
                }}
              >
                1
              </button>
              <button
                className="px-4 py-2 rounded-lg font-sans text-sm transition-all hover:opacity-90"
                style={{ 
                  background: '#75785b', 
                  color: '#e6ddc5' 
                }}
              >
                2
              </button>
              <button
                className="px-4 py-2 rounded-lg font-sans text-sm transition-all hover:opacity-90"
                style={{ 
                  background: '#75785b', 
                  color: '#e6ddc5' 
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;