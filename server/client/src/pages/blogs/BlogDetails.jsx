import React from "react";
import { useFetchBlogByIdQuery } from "../../redux/features/blogs/blogsApi";
import { useParams } from "react-router-dom";
import BlogDetailCard from "./BlogDetailCard";
import CommentCard from "./comments/CommentCard";
import RelatedBlogs from "./relatedBlogs/RelatedBlogs";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);
  console.log(blog);
  return (
    <div className="text-primary container mx-auto mt-8">
      {isLoading && <div>Loading...</div>}
      {error && <div>Oh no! An error occurred. try again.</div>}

      {blog && (
        <div className="flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8">
          <div className="lg:w-2/3 w-full">
            <BlogDetailCard blog={blog} />
            <CommentCard comments={blog?.comments} />
          </div>
          <div className="bg-white lg:w-1/3 w-full">
            <RelatedBlogs />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetails;
