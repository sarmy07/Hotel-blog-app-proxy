const express = require("express");
const {
  createPost,
  getPosts,
  getSinglePost,
  updatePost,
  deletePost,
  relatedPosts,
} = require("../controller/blogController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/create-post", verifyToken, verifyAdmin, createPost);

router.get("/", getPosts);

router.get("/:id", getSinglePost);

router.patch("/:id", verifyToken, verifyAdmin, updatePost);

router.delete("/:id", verifyToken, verifyAdmin, deletePost);

router.get("/related/:id", relatedPosts);

module.exports = router;
