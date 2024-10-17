import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import {
  useFetchBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../../redux/features/blogs/blogsApi";
import { useNavigate, useParams } from "react-router-dom";

const UpdateItems = () => {
  const { id } = useParams();

  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState("");
  const [category, setCategory] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [updateBlog] = useUpdateBlogMutation();
  const { data: blog, error, isLoading, refetch } = useFetchBlogByIdQuery(id);

  useEffect(() => {
    if (blog?.post) {
      const editor = new EditorJS({
        holder: "editorjs",
        onReady: () => {
          editorRef.current = editor;
        },
        autofocus: true,
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
          },
        },
        data: blog?.post.content,
      });
      return () => {
        editor.destroy();
        editorRef.current = null;
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const updatedPost = {
        title: title || blog.post.title,
        coverImg: coverImg || blog.post.coverImg,
        content,
        category: category || blog.post.category,
        description: metaDescription || blog.post.description,
        author: user?._id,
        rating: rating || blog.post.rating,
      };
      const res = await updateBlog({ id, ...updatedPost }).unwrap();
      console.log(res);
      alert("Blog updated!");
      refetch();
      navigate("/");
    } catch (error) {
      console.log("Failed to update blog", error);
      setMessage("Failed to update blog...try again!");
    }
  };

  return (
    <div className="bg-white md:p-8 p-2">
      <h2 className="capitalize text-2xl font-semibold">Update Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        <div className="space-y-4">
          <label className="font-semibold text-xl">Blog Title:</label>
          <input
            type="text"
            className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
            placeholder="Ex: Marina del marriot.."
            required
            // value={title}
            defaultValue={blog?.post.title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* blog details */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          {/* left side */}
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5">Content Section</p>
            <p className="text-sm italic">Write your post below here...</p>
            <div id="editorjs"></div>
          </div>

          {/* right side */}
          <div className="md:w-1/3 w-full border p-5 space-y-5">
            <p className="text-xl font-semibold">Choose blog format</p>
            {/* images */}
            <div className="space-y-4">
              <label className="font-semibold text-xl">Blog Cover:</label>
              <input
                type="text"
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder="https://unsplash.com/image1.png..."
                required
                // value={coverImg}
                defaultValue={blog?.post.coverImg}
                onChange={(e) => setCoverImg(e.target.value)}
              />
            </div>
            {/* catgeory */}
            <div className="space-y-4">
              <label className="font-semibold text-xl">Category:</label>
              <input
                type="text"
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder="RoofTop/Travel/Natural..."
                required
                // value={category}
                defaultValue={blog?.post.category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {/* meata description */}
            <div className="space-y-4">
              <label className="font-semibold text-xl">Meta Description:</label>
              <textarea
                type="text"
                cols={4}
                rows={4}
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                placeholder="Write your blog's meta description..."
                required
                // value={metaDescription}
                defaultValue={blog?.post.description}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="font-semibold text-xl">Rating:</label>
              <input
                type="number"
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                required
                // value={rating}
                defaultValue={blog?.post.rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <label className="font-semibold text-xl">Author:</label>
              <input
                type="text"
                className="w-full inline-block bg-bgPrimary focus:outline-none px-5 py-3"
                required
                disabled
                value={user?.username}
              />
            </div>
          </div>
        </div>
        {message && <p className="text-red-500">{message}</p>}
        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-primary text-white py-3 mt-5 hover:bg-indigo-500 font-medium rounded-md"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default UpdateItems;
