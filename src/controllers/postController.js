const Post = require('../models/postModel');
const { isAuthorized } = require('../utils/Authorization');

const create = async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      author: req.user.id,
      topics: req.body.topicId,
    });

    res.status(200).json({
      message: 'Create post success',
      data: [newPost],
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getById = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Get post successfully',
      data: await Post.findById(req.params.id)
        .populate('author', '_id name')
        .populate('topics', '_id name')
        .populate({
          path: 'postComment',
          populate: {
            path: 'commentBy',
            select: '_id name',
          },
        }),
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    res.status(200).json({
      message: 'Get all post successfully',
      data: await Post.find().populate('author topics', '_id name'),
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getByTopic = async (req, res) => {
  const topicName = req.params.topicName;
  try {
    res.status(200).json({
      message: 'Get all post successfully',
      data: await Post.find({ topics: { $elemMatch: { name: topicName } } })
        .populate('author', '_id name')
        .populate('topics', '_id name'),
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const getByUser = async (req, res) => {
  const userId = req.body.userId;
  try {
    res.status(200).json({
      message: 'Get all post successfully',
      data: await Post.find().populate('author', '_id name'),
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const selectedPost = await Post.findById(req.params.id);

    if (!selectedPost) {
      return res.status(400).json({
        message: 'Post does not exist',
      });
    }

    const isAuth = await isAuthorized(
      req.user.id,
      selectedPost.author.toString()
    );
    if (!isAuth) {
      return res.status(400).json({
        message: 'Not authorization',
      });
    }

    const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id });

    res.status(200).json({
      message: 'Delete post successfully',
      data: deletedPost,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const update = async (req, res) => {
  const id = req.params.id;
  const updatedPost = req.body.updatedPost;
  try {
    await Post.findByIdAndUpdate(id, updatedPost);
    res.status(200).json({
      message: 'Update post successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const voteUp = async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndUpdate(id, {
      $pull: { downvote: req.user.id },
      $push: { upvote: req.user.id },
    });

    res.status(200).json({
      message: 'Vote up post successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const voteDown = async (req, res) => {
  const id = req.params.id;
  try {
    await Post.findByIdAndUpdate(id, {
      $pull: { upvote: req.user.id },
      $push: { downvote: req.user.id },
    });
    res.status(200).json({
      message: 'Vote down post successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const comment = async (req, res) => {
  const id = req.params.id;

  const newComment = {
    commentBy: req.user.id,
    comment: req.body.comment,
  };

  try {
    await Post.findByIdAndUpdate(id, {
      $push: { postComment: newComment },
    });

    res.status(200).json({
      message: 'Comment post successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const commentVoteUp = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    await Post.findByIdAndUpdate(
      { _id: postId, 'postComment._id': commentId },
      {
        $push: { 'postComment.commentBy': req.user.id },
      }
    );
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
const commentVoteDown = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    await Post.findByIdAndUpdate(
      { _id: postId, 'postComment._id': commentId },
      {
        $pull: { 'postComment.commentBy': req.user.id },
      }
    );
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
  getByTopic,
  getByUser,
  voteUp,
  voteDown,
  comment,
  commentVoteUp,
  commentVoteDown,
};
