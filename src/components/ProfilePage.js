import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost, fetchUserPosts } from "../features/postSlice";
import { updateAvatar } from "../features/userSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [postContent, setPostContent] = useState("");
  const [media, setMedia] = useState("");
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
      const newPost = { content: postContent, media };
      dispatch(createPost(newPost));
      setPostContent("");
      setMedia("");
      if (userInfo?._id) dispatch(fetchUserPosts(userInfo._id));
    }
  };

  const handleAvatarChange = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    dispatch(updateAvatar({ avatarUrl }));
  };

  return (
    <div className="container mt-5 p-4" style={{ maxWidth: "950px", background: "linear-gradient(to bottom right, #f0f2f5, #ffffff)", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
      <div className="profile-header mb-4 p-4 text-center rounded-lg" style={{ backgroundColor: "#fff", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
        {userInfo?.avatar && (
          <img src={userInfo.avatar} alt="Profile Avatar" style={{
            width: "120px", height: "120px", borderRadius: "50%", border: "4px solid #007bff",
            boxShadow: "0 4px 15px rgba(0, 123, 255, 0.3)", marginBottom: "15px",
          }} />
        )}
        <h2 className="text-primary mb-2">{userInfo?.name}'s Profile</h2>
        <p className="text-muted"><strong>Email:</strong> {userInfo?.email}</p>
        <p className="text-muted"><strong>Username:</strong> {userInfo?.name}</p>
        <div className="d-flex justify-content-around text-muted mt-2">
          <p><strong>Following:</strong> {userInfo?.following?.length || 0}</p>
          <p><strong>Followers:</strong> {userInfo?.followers?.length || 0}</p>
          <p><strong>Bookmarks:</strong> {userInfo?.bookmarks?.length || 0}</p>
        </div>
      </div>

      <section className="avatar-section mb-5 p-4 rounded-lg shadow-sm" style={{ backgroundColor: "#fff" }}>
        <h3 className="text-secondary text-center">Choose Your Avatar</h3>
        <div className="avatar-options d-flex justify-content-center gap-4 mt-4">
          {avatarOptions.map((avatar) => (
            <img key={avatar} src={avatar} alt="Avatar" className={`avatar-option ${selectedAvatar === avatar ? "selected" : ""}`} style={{
              cursor: "pointer", width: "90px", height: "90px", borderRadius: "50%", border: selectedAvatar === avatar ? "4px solid #007bff" : "2px solid #ddd",
              boxShadow: selectedAvatar === avatar ? "0px 0px 15px rgba(0, 123, 255, 0.5)" : "none", transition: "transform 0.3s ease",
              transform: selectedAvatar === avatar ? "scale(1.1)" : "scale(1)"
            }} onClick={() => handleAvatarChange(avatar)} />
          ))}
        </div>
      </section>

      <section className="create-post-section mb-5 p-4 rounded-lg shadow-sm" style={{ backgroundColor: "#fff" }}>
        <h2 className="text-secondary text-center mb-4">Create a Post</h2>
        <form onSubmit={handleCreatePost} className="card p-3 shadow-sm border-0 mb-4">
          <textarea className="form-control mb-3" placeholder="What's on your mind?" value={postContent} onChange={(e) => setPostContent(e.target.value)} rows="3" required style={{
            resize: "none", borderRadius: "8px", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)",
          }} />
          <input type="url" placeholder="Image URL" className="form-control mb-3" value={media} onChange={(e) => setMedia(e.target.value)} style={{
            borderRadius: "8px", boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.1)"
          }} />
          <button type="submit" className="btn btn-primary w-100 rounded-lg shadow-lg">Post</button>
        </form>
      </section>

      <section className="my-posts-section" style={{ backgroundColor: "#fff", borderRadius: "10px", padding: "20px", border: "1px solid #ddd" }}>
        <h2 className="text-secondary mb-4">My Posts</h2>
        {loading ? <p>Loading posts...</p> : error ? <p className="text-danger">Error fetching posts: {error}</p> : posts.length > 0 ? (
          <div className="row">
            {posts.map((post) => (
              <div key={post._id} className="col-md-4 mb-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <p className="card-text">{post.content}</p>
                    {post.media && (
                      <img src={post.media} alt="Post Media" className="img-fluid rounded mb-3" style={{ maxHeight: "200px", objectFit: "cover", borderRadius: "8px" }} />
                    )}
                  </div>
                  <div className="card-footer text-muted">
                    Posted on {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : <p>No posts found.</p>}
      </section>
    </div>
  );
};

export default ProfilePage;
