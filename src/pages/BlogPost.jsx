import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendar,
  faUser,
  faTags,
  faArrowLeft,
  faShare,
  faHeart,
  faClock
} from '@fortawesome/free-solid-svg-icons'

const BlogPost = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://bunai-from-hills-backend.vercel.app/api/blog/${id}`
        )

        if (!response.ok) {
          throw new Error('Failed to fetch blog post')
        }

        const postData = await response.json()

        const transformedPost = {
          id: postData._id,
          title: postData.title,
          excerpt: postData.excerpt,
          content: postData.content,
          author: postData.author,
          date: postData.date,
          category: postData.category,
          readTime: postData.readTime,
          image: postData.imageUrl || null,
          tags: postData.tags || []
        }

        setPost(transformedPost)

        const relatedResponse = await fetch(
          `https://bunai-from-hills-backend.vercel.app/api/blog`
        )

        if (!relatedResponse.ok) {
          throw new Error('Failed to fetch related posts')
        }

        const allPosts = await relatedResponse.json()

        const related = allPosts
          .filter(
            p => p._id !== postData._id && p.category === postData.category
          )
          .slice(0, 3)
          .map(p => ({
            id: p._id,
            title: p.title,
            excerpt: p.excerpt,
            date: p.date
          }))

        setRelatedPosts(related)
      } catch (error) {
        console.error('Error fetching blog post:', error)
        setPost(null)
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

  const formatDate = dateString =>
    new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

  if (loading) {
    return (
      <div
        className="min-h-screen pt-20 pb-12 px-4"
        style={{ background: '#e6ddc5' }}
      >
        <div className="max-w-4xl mx-auto text-center py-20">
          <div
            className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 mx-auto mb-4"
            style={{ borderColor: '#75785b' }}
          ></div>
          <p className="text-xl" style={{ color: '#75785b' }}>
            Loading blog post...
          </p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div
        className="min-h-screen pt-20 pb-12 px-4"
        style={{ background: '#e6ddc5' }}
      >
        <div className="max-w-4xl mx-auto text-center py-20">
          <p className="text-xl mb-6" style={{ color: '#75785b' }}>
            Blog post not found.
          </p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 rounded-lg font-medium"
            style={{ background: '#75785b', color: '#e6ddc5' }}
          >
            Back to Blog
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen pt-20 pb-12 px-4"
      style={{ background: '#e6ddc5' }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Back */}
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 mb-8 text-sm hover:opacity-70"
          style={{ color: '#75785b' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Blog
        </button>

        {/* Image */}
        {post.image && (
          <div className="aspect-video overflow-hidden rounded-2xl mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content */}
        <article className="mb-12">
          <div
            className="flex items-center gap-4 mb-6 text-sm opacity-70"
            style={{ color: '#75785b' }}
          >
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendar} />
              {formatDate(post.date)}
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faUser} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} />
              {post.readTime}
            </span>
          </div>

          <h1
            className="text-3xl md:text-4xl font-light mb-6"
            style={{ color: '#75785b' }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap gap-3 mb-8">
            <span
              className="px-3 py-1 rounded-full text-xs"
              style={{
                background: 'rgba(117,120,91,0.1)',
                color: '#75785b'
              }}
            >
              <FontAwesomeIcon icon={faTags} /> {post.category}
            </span>

            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  background: 'rgba(117,120,91,0.1)',
                  color: '#75785b'
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="prose max-w-none" style={{ color: '#75785b' }}>
            {post.content
              ?.split('\n\n')
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        </article>

        {/* Actions */}
        <div className="flex gap-4 mb-12">
          <button
            onClick={() => alert('Like feature coming soon')}
            className="px-6 py-3 rounded-lg"
            style={{ background: '#75785b', color: '#e6ddc5' }}
          >
            <FontAwesomeIcon icon={faHeart} /> Like
          </button>

          <button
            onClick={() => alert('Share feature coming soon')}
            className="px-6 py-3 rounded-lg"
            style={{ background: '#75785b', color: '#e6ddc5' }}
          >
            <FontAwesomeIcon icon={faShare} /> Share
          </button>
        </div>

        {/* Related */}
        {relatedPosts.length > 0 && (
          <section>
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: '#75785b' }}
            >
              Related Posts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map(rp => (
                <div
                  key={rp.id}
                  onClick={() => navigate(`/blog/${rp.id}`)}
                  className="p-6 rounded-2xl cursor-pointer hover:-translate-y-1 transition"
                  style={{ background: 'rgba(232,189,125,0.2)' }}
                >
                  <h3
                    className="text-lg font-semibold mb-2"
                    style={{ color: '#75785b' }}
                  >
                    {rp.title}
                  </h3>
                  <p
                    className="text-sm mb-2 opacity-80"
                    style={{ color: '#75785b' }}
                  >
                    {rp.excerpt}
                  </p>
                  <span className="text-xs opacity-70">
                    {formatDate(rp.date)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default BlogPost
