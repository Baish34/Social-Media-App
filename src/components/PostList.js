import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postSlice";

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <p>Loading posts...</p>;
  if (error) return <p>Error fetching posts: {error}</p>;

  return (
    <div className="container mt-4">
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post._id} className="mb-3 border p-3">
          <p>{post.content}</p>
          <p><small>{new Date(post.createdAt).toLocaleString()}</small></p>
          <p>Likes: {post.likes}</p>
    
        </div>
      ))}
    </div>
  );
};

export default PostList;
