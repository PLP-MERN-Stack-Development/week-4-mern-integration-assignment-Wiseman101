import { createContext, useState } from 'react';
import axios from 'axios';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 🔁 Fetch all posts
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/posts");
      setPosts(res.data);
      setError('');
    } catch (err) {
      console.error("❌ Failed to fetch posts:", err);
      setError('❌ Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  // ➕ Create a new post
  const createPost = async (data) => {
    try {
      const payload = {
        ...data,
        author: "Hillary Wafula", // Replace with real user if auth is implemented
      };

      const res = await axios.post("http://localhost:5000/api/posts", payload);
      return res;
    } catch (err) {
      console.error("❌ Error creating post:", err.response?.data || err.message);
      throw err;
    }
  };

  // ✏️ Update an existing post
  const updatePost = async (id, data) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/posts/${id}`, data);
      return res;
    } catch (err) {
      console.error("❌ Error updating post:", err.response?.data || err.message);
      throw err;
    }
  };

  // 🗑️ Delete post
  const deletePost = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      console.error("❌ Error deleting post:", err.response?.data || err.message);
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loading,
        error,
        fetchPosts,
        createPost,
        updatePost,
        deletePost,
        setPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
