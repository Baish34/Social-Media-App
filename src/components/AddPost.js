import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AddPost = () => {
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addPost({ content })); // You'll need to implement addPost in the slice
    setContent(""); // Clear the input after submission
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label>Post Content</label>
        <textarea
          className="form-control"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Post</button>
    </form>
  );
};

export default AddPost;
