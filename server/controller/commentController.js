const Comment = require("../model/Comment");

const postComment = async (req, res) => {
  try {
    const comment = new Comment(req.body);
    await comment.save();
    return res.status(200).json(comment);
  } catch (error) {
    console.log(error);
  }
};

const getTotalComments = async (req, res) => {
  const totalComments = await Comment.countDocuments({});
  return res.status(200).json(totalComments);
};

module.exports = { postComment, getTotalComments };
