import React from "react";
import EditorJSHTML from "editorjs-html";

const editorJSHTML = EditorJSHTML();

const BlogDetailCard = ({ blog }) => {
  const {
    title,
    content,
    author,
    description,
    coverImg,
    category,
    rating,
    createdAt,
  } = blog || {};
  const htmlContent = editorJSHTML.parse(blog?.post?.content).join(" ");

  return (
    <>
      <div className="bg-white p-8">
        {/* blog header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">
            {blog?.post?.title}
          </h1>
          <p className="mb-6">
            {new Date(blog?.post.createdAt).toLocaleDateString("en-Us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            by {""}
            <span className="text-blue-400 cursor-pointer">
              {/* {blog.post.author} */}
              admin 1
            </span>
          </p>
        </div>
        {/* blog image */}
        <div>
          <img
            className="w-full md:h-[520px] bg-cover"
            src={blog?.post?.coverImg}
            alt="cover Image"
          />
        </div>
        {/* blog content */}
        <div className="mt-8 space-y-4">
          <div
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="space-y-3 editorjsdiv"
          />
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-lg font-medium">Rating:</span>
          <span>{blog?.post?.rating} (based on 1344  reviews)</span>
        </div>
      </div>
    </>
  );
};

export default BlogDetailCard;
