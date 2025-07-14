import { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from './PostCard'; // Same folder
import Pagination from '../UI/Pagination';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data.reverse()); // Show newest first
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Pagination logic
  const indexOfLast = page * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div>
      {currentPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default PostList;
