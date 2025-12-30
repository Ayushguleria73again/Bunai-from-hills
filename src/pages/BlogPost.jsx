import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faUser, faTags, faComments, faArrowLeft, faShare, faHeart } from '@fortawesome/free-solid-svg-icons';

const BlogPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Fetch the specific post
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog post');
        }
        const postData = await response.json();
        
        // Transform backend data for frontend usage
        const transformedPost = {
          id: postData._id,
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          author: postData.author,
          date: postData.date,
          category: postData.category,
          readTime: postData.readTime,
          image: postData.imageUrl ? `${import.meta.env.VITE_API_BASE_URL1}${postData.imageUrl}` : null,
          tags: postData.tags || []
        };
        
        setPost(transformedPost);
        
        // Fetch related posts (posts with same category)
        const relatedResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/blog`);
        if (!relatedResponse.ok) {
          throw new Error('Failed to fetch related posts');
        }
        const allPosts = await relatedResponse.json();
        
        // Transform related posts data
        const related = allPosts
          .filter(p => p._id !== postData._id && p.category === postData.category)
          .slice(0, 3)
          .map(post => ({
            id: post._id,
            title: post.title,
            excerpt: post.excerpt,
            date: post.date,
            image: post.imageUrl ? `${import.meta.env.VITE_API_BASE_URL1}${post.imageUrl}` : null
          }));
          
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
        <div className="max-w-4xl mx-auto text-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mx-auto mb-4" style={{ borderColor: '#75785b' }}></div>
          <p className="text-xl" style={{ color: '#75785b' }}>Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-xl mb-6" style={{ color: '#75785b' }}>Blog post not found.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 rounded-lg font-sans font-medium transition-all hover:opacity-90"
            style={{ 
              background: '#75785b', 
              color: '#e6ddc5' 
            }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 mb-8 text-sm font-sans hover:opacity-70 transition-opacity"
          style={{ color: '#75785b' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Blog
        </button>

        {/* Featured Image */}
        <div className="aspect-video overflow-hidden rounded-2xl mb-8">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Post Content */}
        <article className="mb-12">
          <div className="flex items-center gap-4 mb-6 text-sm" style={{ color: '#75785b', opacity: 0.7 }}>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendar} className="text-xs" />
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faUser} className="text-xs" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faComments} className="text-xs" />
              <span>{post.readTime}</span>
            </div>
          </div>

          <h1 
            className="font-serif text-3xl md:text-4xl font-light mb-6"
            style={{ color: '#75785b' }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(117, 120, 91, 0.1)', color: '#75785b' }}>
              <FontAwesomeIcon icon={faTags} className="text-xs" />
              {post.category}
            </div>
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ background: 'rgba(117, 120, 91, 0.1)', color: '#75785b' }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div 
            className="prose prose-lg max-w-none font-sans text-base leading-relaxed"
            style={{ color: '#75785b' }}
          >
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </article>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 mb-12">
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-medium transition-all hover:opacity-90" style={{ background: '#75785b', color: '#e6ddc5' }}>
            <FontAwesomeIcon icon={faHeart} />
            Like
          </button>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg font-sans font-medium transition-all hover:opacity-90" style={{ background: '#75785b', color: '#e6ddc5' }}>
            <FontAwesomeIcon icon={faShare} />
            Share
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mb-12">
            <h2 className="font-serif text-2xl font-semibold mb-6" style={{ color: '#75785b' }}>
              Related Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(relatedPost => (
                <div
                  key={relatedPost.id}
                  className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ background: 'rgba(232, 189, 125, 0.2)' }}
                  onClick={() => navigate(`/blog/${relatedPost.id}`)}
                >
                  <div className="p-6">
                    <h3 
                      className="font-serif text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2"
                      style={{ color: '#75785b' }}
                    >
                      {relatedPost.title}
                    </h3>
                    <p 
                      className="text-sm mb-3 line-clamp-2"
                      style={{ color: '#75785b', opacity: 0.8 }}
                    >
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs" style={{ color: '#75785b', opacity: 0.7 }}>
                      <FontAwesomeIcon icon={faCalendar} />
                      <span>{formatDate(relatedPost.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Comments Section */}
        <section>
          <h2 className="font-serif text-2xl font-semibold mb-6" style={{ color: '#75785b' }}>
            Comments
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center" style={{ background: 'rgba(117, 120, 91, 0.2)' }}>
                  <span className="font-serif" style={{ color: '#75785b' }}>A</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-sans font-medium" style={{ color: '#75785b' }}>Anonymous User</span>
                    <span className="text-xs" style={{ color: '#75785b', opacity: 0.7 }}>2 days ago</span>
                  </div>
                  <p className="font-sans text-sm" style={{ color: '#75785b' }}>
                    This is a wonderful article! I really appreciate learning more about the artisans and their craft. It makes me value handcrafted products even more.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center" style={{ background: 'rgba(117, 120, 91, 0.2)' }}>
                  <span className="font-serif" style={{ color: '#75785b' }}>S</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-sans font-medium" style={{ color: '#75785b' }}>Sarah Johnson</span>
                    <span className="text-xs" style={{ color: '#75785b', opacity: 0.7 }}>1 week ago</span>
                  </div>
                  <p className="font-sans text-sm" style={{ color: '#75785b' }}>
                    Thank you for sharing this insightful piece. I've been looking for ways to support local artisans in my area and this gives me great ideas.
                  </p>
                </div>
              </div>
            </div>

            {/* Comment Form */}
            <div className="p-6 rounded-2xl" style={{ background: 'rgba(232, 189, 125, 0.2)' }}>
              <h3 className="font-serif text-xl font-semibold mb-4" style={{ color: '#75785b' }}>
                Leave a Comment
              </h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg font-sans text-base border-2"
                    style={{ 
                      background: '#e6ddc5', 
                      color: '#75785b', 
                      borderColor: 'rgba(117, 120, 91, 0.2)' 
                    }}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg font-sans text-base border-2"
                    style={{ 
                      background: '#e6ddc5', 
                      color: '#75785b', 
                      borderColor: 'rgba(117, 120, 91, 0.2)' 
                    }}
                  />
                </div>
                <textarea
                  placeholder="Your Comment"
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg font-sans text-base border-2 resize-none"
                  style={{ 
                    background: '#e6ddc5', 
                    color: '#75785b', 
                    borderColor: 'rgba(117, 120, 91, 0.2)' 
                  }}
                ></textarea>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg font-sans font-medium transition-all hover:opacity-90"
                  style={{ 
                    background: '#75785b', 
                    color: '#e6ddc5' 
                  }}
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;