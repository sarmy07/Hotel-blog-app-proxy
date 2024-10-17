const express = require("express");
const {
  postComment,
  getTotalComments,
} = require("../controller/commentController");
const router = express.Router();

router.get("/total-comments", getTotalComments);
router.post("/post-comment", postComment);

module.exports = router;
