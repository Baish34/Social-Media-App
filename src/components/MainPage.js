import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, followUser, unfollowUser } from "../features/userSlice";
import { fetchPosts } from "../features/postSlice";

const formatDate = (dateString) => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} sec${diffInSeconds !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  } else {
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
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

  const otherUserPosts = userInfo
    ? posts.filter((post) => post.user._id !== userInfo._id)
    : [];
  const otherUsers = userInfo
    ? users.filter((user) => user._id !== userInfo._id)
    : [];

  return (
    <div className="bg-light min-vh-100">
      <br />
      <div className="container">
        <div className="row">
          {/* Posts Section (Left) */}
          <div className="col-md-8">
            <section className="mb-5">
              <h2 className="text-secondary mb-4">Latest Posts</h2>
              {loading && (
                <p className="text-center text-primary">Loading posts...</p>
              )}
              {error && (
                <p className="text-center text-danger">Error: {error}</p>
              )}
              <div className="row">
                {otherUserPosts.length > 0 ? (
                  otherUserPosts.map((post) => (
                    <div key={post._id} className="col-12 mb-4">
                      <div className="card h-100 shadow-sm border-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="card-title mb-0 text-dark">
                              {post.user.name}
                            </h5>
                            <small className="text-muted">
                              {formatDate(post.createdAt)}
                            </small>
                          </div>
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
                        <div className="card-footer bg-white border-0 text-center">
                          <div className="d-flex justify-content-around align-items-center">
                            <button className="btn btn-link text-decoration-none text-dark">
                              <i className="fas fa-thumbs-up"></i> Like
                            </button>
                            <button className="btn btn-link text-decoration-none text-dark">
                              <i className="fas fa-comment"></i> Comment
                            </button>
                            <button className="btn btn-link text-decoration-none text-dark">
                              <i className="fas fa-share"></i> Share
                            </button>
                            <button className="btn btn-link text-decoration-none text-dark">
                              <i className="fas fa-bookmark"></i> Bookmark
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center">No posts to display.</p>
                )}
              </div>
            </section>
          </div>

          {/* Users Section (Right) */}
          <div className="col-md-4">
            <section className="mb-5">
              <h2 className="text-secondary mb-4">Other Users</h2>
              <ul className="p-0 bg-white px-3 py-3">
                {otherUsers.length > 0 ? (
                  otherUsers.map((user) => (
                    <li
                      key={user._id}
                      className="d-flex justify-content-between align-items-center py-2"
                      style={{ borderBottom: "1px solid #e9ecef" }}
                    >
                      <h5 className="mb-0">
                        <span>{user.name}</span>
                      </h5>
                      {userInfo && userInfo.following.includes(user._id) ? (
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleUnfollow(user._id)}
                        >
                          Unfollow
                        </button>
                      ) : (
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleFollow(user._id)}
                        >
                          Follow
                        </button>
                      )}
                    </li>
                  ))
                ) : (
                  <p className="text-center">No users to display.</p>
                )}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
