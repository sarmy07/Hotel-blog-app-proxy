import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";

const PostComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");

  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  const navigate = useNavigate();

  const [PostComment] = usePostCommentMutation();
  const { refetch } = useFetchBlogByIdQuery(id, { skip: !id }); 

  const handlePost = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Login to post on this blog");
      navigate("/login");
      return;
    }
    const newComment = {
      comment: comment,
      user: user._id,
      postId: id,
    };
    // console.log(newComment);
    try {
      const res = await PostComment(newComment).unwrap();
      console.log(res);
      alert("Comment posted successfully!");
      setComment("");
      refetch();
    } catch (error) {
      alert("An error occurred while posting comment");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-8">Leave a comment</h3>
      <form onSubmit={handlePost} action="">
        <textarea
          name="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          cols="30"
          rows="10"
          placeholder="Leave a comment about this post..."
          className="w-full bg-bgPrimary focus:outline-none p-5 rounded-md"
        />
        <button className="w-full mt-2 bg-primary text-white hover:bg-indigo-500 font-medium py-3 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostComment;
