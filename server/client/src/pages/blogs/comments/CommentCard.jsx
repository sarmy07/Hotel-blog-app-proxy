import React from "react";
import commentorIcon from "../../../assets/hero-carousel/commentor.png";
import PostComment from "./PostComment";
import { useSelector } from "react-redux";

const CommentCard = ({ comments }) => {
  const user = useSelector((state) => state.auth.user);
  // console.log(comments);
  return (
    <div className="bg-white p-8 my-6">
      <div>
        {comments?.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments</h3>
            <div>
              {comments.map((comment) => (
                <div className="mt-4" key={comment._id}>
                  <div className="flex gap-4 items-center">
                    <img src={commentorIcon} className="h-14" alt="" />
                    <div className="flex flex-col gap-2">
                      <h4 className="text-lg font-medium underline underline-offset-4 text-blue-400">
                        {comment?.user?.email}
                      </h4>
                      <p className="text-xs italic">
                        {new Date(comment?.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {/* comment details */}
                  <div className="text-gray-600 mt-5 border p-8">
                    <p className="md:w-4/5">{comment?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-lg font-medium">No Comments</div>
        )}
      </div>
      {/* add comment */}
      <PostComment />
    </div>
  );
};

export default CommentCard;
