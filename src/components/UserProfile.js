import React from "react";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <div className="profile-container mb-4">
      <h3 className="text-center">Your Profile</h3>
      <div className="card p-3">
        <img
          src={userInfo.avatar || "default-avatar.png"}
          alt="Avatar"
          className="img-fluid rounded-circle mx-auto d-block"
          style={{ width: "100px", height: "100px" }}
        />
        <h5 className="text-center mt-3">{userInfo.username}</h5>
        <p className="text-center">{userInfo.bio}</p>
        <p className="text-center">
          Followers: {userInfo.followers} Following: {userInfo.following}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
