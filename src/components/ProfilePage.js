import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchUserPosts } from "../features/postSlice";
import { updateAvatar } from "../features/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(userInfo?.avatar || "");

  const avatarOptions = [
    "https://plus.unsplash.com/premium_vector-1727955579176-073f1c85dcda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_vector-1728555239662-4d94974e6c71?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_vector-1721131162874-d8bcb33d6bad?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_vector-1728572090698-c48406f95374?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGF2YXRhcnN8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_vector-1728572090837-2828fc9ca131?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

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

  const handleAvatarChange = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    dispatch(updateAvatar({ avatarUrl }));
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "900px" }}>
      <div
        className="profile-header mb-4 p-3 text-center shadow-sm"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        {userInfo?.avatar && (
          <img
            src={userInfo.avatar}
            alt="Profile Avatar"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "3px solid #007bff",
              boxShadow: "0px 0px 8px rgba(0, 123, 255, 0.5)",
              marginBottom: "15px",
            }}
          />
        )}
        <h2 className="text-primary mb-2">{userInfo?.name}'s Profile</h2>
        <p>
          <strong>Email:</strong> {userInfo?.email}
        </p>
        <p>
          <strong>Username:</strong> {userInfo?.name}
        </p>
        <p>
          <strong>Following:</strong> {userInfo?.following.length}
        </p>
        <p>
          <strong>Followers:</strong> {userInfo?.followers.length}
        </p>
      </div>

      {/* Avatar Selection Section */}
      <section
        className="mb-5 p-3"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        <h3 className="text-secondary">Select Your Avatar</h3>
        <div className="avatar-options d-flex flex-wrap gap-3 mt-3">
          {avatarOptions.map((avatar) => (
            <img
              key={avatar}
              src={avatar}
              alt="Avatar"
              className={`avatar-option ${
                selectedAvatar === avatar ? "selected" : ""
              }`}
              style={{
                cursor: "pointer",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                border:
                  selectedAvatar === avatar
                    ? "3px solid #007bff"
                    : "2px solid #ddd",
                boxShadow:
                  selectedAvatar === avatar
                    ? "0px 0px 8px rgba(0, 123, 255, 0.5)"
                    : "none",
                transition: "all 0.3s",
              }}
              onClick={() => handleAvatarChange(avatar)}
            />
          ))}
        </div>
      </section>

      {/* Create Post Section */}
      <section
        className="mb-5 p-3"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          border: "1px solid #ddd",
        }}
      >
        <h2 className="text-secondary mb-4">Create a Post</h2>
        <form
          onSubmit={handleCreatePost}
          className="card p-3 shadow-sm border-0 mb-4"
        >
          <div className="form-group mb-3">
            <textarea
              className="form-control"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              rows="3"
              required
              style={{ resize: "none" }}
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
      <section
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "10px",
          padding: "20px",
          border: "1px solid #ddd",
        }}
      >
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
                        className="img-fluid rounded mb-3"
                        style={{ maxHeight: "200px", objectFit: "cover" }}
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
          <p className="text-muted text-center">
            You haven't posted anything yet.
          </p>
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
