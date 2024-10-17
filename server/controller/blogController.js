const Blog = require("../model/Blog");
const Comment = require("../model/Comment");

const createPost = async (req, res) => {
  try {
    const post = new Blog({ ...req.body, author: req.user.id });
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: "error creating post" });
    console.error("Error creating post:", error);
  }
};

const getPosts = async (req, res) => {
  try {
    const { search, category, location } = req.query;
    console.log(search);

    let query = {};

    if (search) {
      query = {
        ...query,
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      };
    }

    if (category) {
      query = {
        ...query,
        category,
      };
    }

    if (location) {
      query = {
        ...query,
        location,
      };
    }

    const posts = await Blog.find(query)
      .populate("author", "email") // populate the author field with the email
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error fetching blogs" });
    console.log("Error fetching Blogs:", error);
  }
};

const getSinglePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Blog.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "No blog found!" });
    }

    // TODO fetch comment related to post
    const comments = await Comment.find({ postId: postId }).populate(
      "user",
      "username, email"
    ); // populate the user field with the username and email

    return res.status(200).json({ post, comments });
  } catch (error) {
    res.status(400).json({ error: "error finding post" });
    console.error("Error finding post:", error);
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Blog.findByIdAndUpdate(
      postId,
      { ...req.body },
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ error: "No blog found!" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: "error updating post" });
    console.error("Error finding post:", error);
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Blog.findByIdAndDelete(postId);
    if (!post) {
      return res.status(404).json({ error: "No blog found!" });
    }

    // TODO delete comments related to post
    await Comment.deleteMany({ postId: postId });

    return res.status(200).json({ msg: "Post deleted!" });
  } catch (error) {
    res.status(400).json({ error: "error updating post" });
    console.error("Error finding post:", error);
  }
};

const relatedPosts = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "postId is required" });
    }
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ msg: "No blog found" });
    }

    const titleRegex = new RegExp(blog.title.split(" ").join("|"), "i");
    const relatedQuery = {
      _id: { $ne: id }, //!exclude the current blog by id
      title: { $regex: titleRegex },
    };

    const relatedBlogs = await Blog.find(relatedQuery);
    return res.status(200).json(relatedBlogs);
  } catch (error) {
    res.status(400).json({ error: "error fetching post" });
    console.error("Error fetching post:", error);
  }
};

module.exports = {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  relatedPosts,
};
