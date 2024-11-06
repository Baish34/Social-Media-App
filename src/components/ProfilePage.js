import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, fetchUserPosts } from "../features/postSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { posts, loading, error } = useSelector((state) => state.posts); 
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState(null);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(fetchUserPosts(userInfo._id));
    }
  }, [dispatch, userInfo]);

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost = {
        content: postContent,
        media: media ? [URL.createObjectURL(media)] : [],
      };
      dispatch(createPost(newPost)); 
      setPostContent(""); 
      setMedia(null); 
    }
  };

  return (
    <div className="container mt-5">
      <div className="profile-header mb-4">
        <h2>{userInfo.name}'s Profile</h2>
        <p>Email: {userInfo.email}</p>
        <p>Username: {userInfo.name}</p>
        <p>Following: {userInfo.following.length}</p>
        <p>Followers: {userInfo.followers.length}</p>
      </div>

      {/* Create Post Section */}
      <section className="mb-5">
        <h2 className="text-secondary mb-4">Create a Post</h2>
        <form onSubmit={handleCreatePost} className="card p-3 shadow-sm border-0 mb-4">
          <div className="form-group mb-3">
            <textarea
              className="form-control"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows="3"
              required
            ></textarea>
          </div>
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control"
              onChange={(e) => setMedia(e.target.files[0])}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Post
          </button>
        </form>
      </section>

      {/* My Posts Section */}
      <section>
        <h2 className="text-secondary mb-4">My Posts</h2>
        {loading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-danger">Error fetching posts: {error}</p>
        ) : posts.length > 0 ? (
          <div className="row">
            {posts.map((post) => (
              <div key={post._id} className="col-md-4 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <p className="card-text">{post.content}</p>
                    {post.media && post.media.length > 0 && (
                      <img
                        src={post.media[0]} 
                        alt="Post Media"
                        className="img-fluid mb-3"
                      />
                    )}
                  </div>
                  <div className="card-footer text-muted">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>You haven't posted anything yet.</p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;

