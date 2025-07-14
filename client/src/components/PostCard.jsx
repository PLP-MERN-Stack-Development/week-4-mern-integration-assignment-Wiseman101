import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0' }}>
      <h3>{post.title}</h3>
      <p>{post.excerpt || post.content?.slice(0, 150)}...</p>

      {/* Image (if any) */}
      {post.image && (
        <img
          src={`/uploads/${post.image}`}
          alt="Post"
          style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
        />
      )}

      <Link to={`/posts/${post._id}`} style={{ color: 'blue' }}>
        Read More →
      </Link>
    </div>
  );
};

export default PostCard;
