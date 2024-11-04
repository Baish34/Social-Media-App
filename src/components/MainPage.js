import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../features/postSlice"; 

const MainPage = () => {
  
  const dispatch = useDispatch();

  const { posts, loading, error } = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="mt-5">Latest Posts</h2>

      {loading && <p className="text-center text-primary">Loading posts...</p>}
      {error && <p className="text-center text-danger">Error: {error}</p>}

      <div className="row">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="col-md-6 col-lg-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <p className="card-text">{post.content}</p>
                  {post.media && post.media.length > 0 && (
                    <div className="d-flex flex-wrap gap-2">
                      {post.media.map((mediaUrl, index) => (
                        <img
                          key={index}
                          src={mediaUrl}
                          alt="Post media"
                          className="img-fluid rounded"
                          style={{ maxWidth: "100%", height: "auto" }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <div className="card-footer bg-white">
                  <p className="text-muted mb-0">Likes: {post.likes.length}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No posts to display.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
