import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faCalendar, faUser } from '@fortawesome/free-solid-svg-icons'

const Blog = () => {
  const navigate = useNavigate()

  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Handmade Crochet: A Journey from the Hills',
      excerpt: 'Discover the traditional techniques and stories behind our handcrafted crochet items, made with love by skilled artisans in the Himalayan region.',
      date: '2024-01-15',
      author: 'Bunai Team',
      category: 'Craft Stories',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Sustainable Yarn: Choosing Eco-Friendly Materials',
      excerpt: 'Learn about our commitment to sustainability and how we source premium quality, eco-friendly yarns for our crochet creations.',
      date: '2024-01-10',
      author: 'Bunai Team',
      category: 'Sustainability',
      readTime: '4 min read'
    },
    {
      id: 3,
      title: 'Caring for Your Handcrafted Crochet Items',
      excerpt: 'Essential tips and tricks to maintain the beauty and longevity of your handmade crochet pieces, ensuring they last for years to come.',
      date: '2024-01-05',
      author: 'Bunai Team',
      category: 'Care Guide',
      readTime: '3 min read'
    },
    {
      id: 4,
      title: 'Supporting Local Artisans: Our Mission',
      excerpt: 'How every purchase from Bunai From Hills directly supports families and communities in the Himalayan region, preserving traditional craftsmanship.',
      date: '2023-12-28',
      author: 'Bunai Team',
      category: 'Community',
      readTime: '6 min read'
    },
    {
      id: 5,
      title: 'Crochet Trends: What\'s Hot in 2024',
      excerpt: 'Explore the latest trends in crochet design, from modern patterns to classic styles that never go out of fashion.',
      date: '2023-12-20',
      author: 'Bunai Team',
      category: 'Trends',
      readTime: '5 min read'
    },
    {
      id: 6,
      title: 'The Perfect Gift: Handmade with Heart',
      excerpt: 'Why handmade crochet items make the perfect gift for your loved ones, bringing warmth and meaning to special occasions.',
      date: '2023-12-15',
      author: 'Bunai Team',
      category: 'Gift Ideas',
      readTime: '4 min read'
    }
  ]

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  }

  return (
    <div className="min-h-screen pt-20 pb-12 px-4" style={{ background: '#e6ddc5' }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 mb-6 text-sm font-sans hover:opacity-70 transition-opacity"
          style={{ color: '#75785b' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Home
        </button>

        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-light mb-4" style={{ color: '#75785b' }}>
            Our Blog
          </h1>
          <p className="font-sans text-base md:text-lg max-w-2xl mx-auto" style={{ color: '#75785b', opacity: 0.8 }}>
            Stories, tips, and insights about handcrafted crochet and our journey
          </p>
        </div>

        {/* Featured Post */}
        {blogPosts.length > 0 && (
          <div className="mb-12">
            <div
              className="rounded-3xl overflow-hidden shadow-xl transform transition-all duration-300 hover:scale-[1.01] cursor-pointer"
              style={{ background: 'rgba(255, 255, 255, 0.5)' }}
              onClick={() => navigate(`/blog/${blogPosts[0].id}`)}
            >
              <div className="p-8 md:p-12">
                <div className="mb-4">
                  <span
                    className="inline-block px-4 py-1 rounded-full text-sm font-semibold"
                    style={{ 
                      background: 'rgba(117, 120, 91, 0.2)',
                      color: '#75785b'
                    }}
                  >
                    {blogPosts[0].category}
                  </span>
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4" style={{ color: '#75785b' }}>
                  {blogPosts[0].title}
                </h2>
                <p className="font-sans text-lg mb-6" style={{ color: '#75785b', opacity: 0.8 }}>
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-6 text-sm" style={{ color: '#75785b', opacity: 0.7 }}>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{formatDate(blogPosts[0].date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faUser} />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <span>{blogPosts[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.slice(1).map((post) => (
            <article
              key={post.id}
              className="rounded-2xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer"
              style={{ background: 'rgba(232, 189, 125, 0.2)' }}
              onClick={() => navigate(`/blog/${post.id}`)}
            >
              <div className="p-6">
                <div className="mb-3">
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                    style={{ 
                      background: 'rgba(117, 120, 91, 0.2)',
                      color: '#75785b'
                    }}
                  >
                    {post.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-semibold mb-3" style={{ color: '#75785b' }}>
                  {post.title}
                </h3>
                <p className="font-sans text-sm mb-4 line-clamp-3" style={{ color: '#75785b', opacity: 0.8 }}>
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs" style={{ color: '#75785b', opacity: 0.7 }}>
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 p-8 md:p-12 rounded-3xl text-center" style={{ background: 'rgba(117, 120, 91, 0.1)' }}>
          <h3 className="font-serif text-2xl md:text-3xl font-semibold mb-4" style={{ color: '#75785b' }}>
            Stay Updated
          </h3>
          <p className="font-sans text-base mb-6 max-w-2xl mx-auto" style={{ color: '#75785b', opacity: 0.8 }}>
            Subscribe to our newsletter to get the latest blog posts, product updates, and special offers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg font-sans border-0 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ 
                background: 'rgba(255, 255, 255, 0.5)',
                color: '#75785b',
                focusRingColor: '#75785b'
              }}
            />
            <button
              className="px-6 py-3 rounded-lg font-sans font-semibold transition-all hover:opacity-90 whitespace-nowrap"
              style={{ 
                background: '#75785b', 
                color: '#e6ddc5' 
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Blog

