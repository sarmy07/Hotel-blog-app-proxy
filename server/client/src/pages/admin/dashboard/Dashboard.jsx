import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/blogsApi";
import { useGetCommentsQuery } from "../../../redux/features/comments/commentApi";
import { useGetUserQuery } from "../../../redux/features/auth/authApi";
import BlogChart from "./BlogChart";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [query, setQuery] = useState({ search: "", category: "" });
  const { data: blogs, error, isLoading } = useFetchBlogsQuery(query);
  const { data: comments } = useGetCommentsQuery();
  const { data: users } = useGetUserQuery();
  const adminCounts = users?.filter((user) => user.role === "admin").length;
  //   console.log(blogs);

  return (
    <>
      {/* {isLoading && <div>Loading...</div>} */}
      {isLoading && (
        <div className="flex items-center justify-center mt-10" role="status">
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      )}

      {error && <div>An error occurred...</div>}
      <div className="space-y-6">
        <div className="bg-bgPrimary p-5">
          <h1>
            Hi, <span className="capitalize">{user?.username}</span>!
          </h1>
          <p>Welcome to the admin dashboard</p>
          <p>
            Here you can manage your hotel's posts, manage rooms and other
            administrative tasks
          </p>
        </div>

        {/*  */}
        <div className="flex flex-col md:flex-row justify-center gap-8 pt-8">
          <div className="bg-indigo-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FiUsers className="size-8 text-indigo-600" />
            <p>{users?.length} Users</p>
          </div>
          <div className="bg-red-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaBlog className="size-8 text-red-600" />
            <p>{blogs?.length} Blogs</p>
          </div>
          <div className="bg-lime-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <RiAdminLine className="size-8 text-lime-600" />
            <p>
              {adminCounts} Admin{adminCounts !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="bg-orange-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaRegComment className="size-8 text-orange-600" />
            <p>{comments} Comments</p>
          </div>
        </div>

        {/* blog chart */}
        <div className="pt-5 pb-5">
          <BlogChart blogs={blogs} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
