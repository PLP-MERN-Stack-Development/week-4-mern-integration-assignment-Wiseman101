import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import useApi from '../hooks/useApi';
import PostForm from '../components/PostForm';
import { PostContext } from '../context/PostContext';

export default function PostEditor() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const api = useApi();
  const navigate = useNavigate();
  const { posts } = useContext(PostContext);

  useEffect(() => {
    if (id) {
      // Try to get post from context first for better UX
      const found = posts.find(p => p._id === id);
      if (found) setPost(found);
      else api.get(`/posts/${id}`).then(setPost);
    }
  }, [id, posts]);

  return (
    <PostForm
      editData={post}
      onSuccess={() => navigate('/')}
    />
  );
}
