import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, followUser, unfollowUser } from "../features/userSlice"; 
import { fetchPosts } from "../features/postSlice";

const formatDate = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) { // Less than 30 days
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
  }
};

const MainPage = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { users, userInfo } = useSelector((state) => state.user); 

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchUsers()); 
  }, [dispatch]);

  const handleFollow = (userId) => {
    dispatch(followUser(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(unfollowUser(userId));
  };

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
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="card-title mb-0">{post.user.username}</h5>
                    <p className="text-muted mb-0">{formatDate(post.createdAt)}</p>
                  </div>
                  <br />
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

      <h2 className="mt-5">Other Users</h2>
      <div className="row">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user._id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{user.username}</h5>
                  <p className="card-text">Followers: {user.followers.length}</p>
                  {userInfo.following.includes(user._id) ? (
                    <button className="btn btn-danger" onClick={() => handleUnfollow(user._id)}>Unfollow</button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleFollow(user._id)}>Follow</button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No users to display.</p>
        )}
      </div>
    </div>
  );
};

export default MainPage;
