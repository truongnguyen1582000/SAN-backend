const Post = require('../models/postModel');
const Event = require('../models/eventModel');
const { isAuthorized } = require('../utils/Authorization');

const create = async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      author: req.user.id,
      topic: req.body.topicId,
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
        .populate('author topic upvote downvote', '_id name')
        .populate({
          path: 'postComment',
          populate: {
            path: 'commentBy upvote downvote',
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
      data: await Post.find()
        .populate('author topic', '_id name')
        .sort('-updatedAt'),
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
    const post = await Post.findById(postId);
    const commentList = post.postComment;
    const idxComment = commentList.findIndex(
      (el) => el._id.toString() === commentId
    );
    commentList[idxComment].upvoteC.push(req.user.id);
    commentList[idxComment].downvoteC = commentList[
      idxComment
    ].downvoteC.filter((el) => el._id.toString() !== req.user.id);

    post.postComment = commentList;

    await Post.findByIdAndUpdate(postId, post);
    res.status(200).json({
      message: 'Vote up comment successfully',
    });
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
    const post = await Post.findById(postId);
    const commentList = post.postComment;
    const idxComment = commentList.findIndex(
      (el) => el._id.toString() === commentId
    );
    commentList[idxComment].downvoteC.push(req.user.id);
    commentList[idxComment].upvoteC = commentList[idxComment].upvoteC.filter(
      (el) => el._id.toString() !== req.user.id
    );
    post.postComment = commentList;
    await Post.findByIdAndUpdate(postId, post);
    res.status(200).json({
      message: 'Vote down comment successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const deleteComment = async (req, res) => {
  const postId = req.params.id;
  const commentId = req.params.commentId;

  console.log(postId, commentId);

  try {
    const post = await Post.findById(postId);
    let commentList = post.postComment;
    const idxComment = commentList.findIndex(
      (el) => el._id.toString() === commentId
    );

    commentList.splice(idxComment, 1);

    post.postComment = commentList;

    await Post.findByIdAndUpdate(postId, post);

    res.status(200).json({
      message: 'Delete comment successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const updateComment = async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;

  try {
    const post = await Post.findById(postId);
    const commentList = post.postComment;
    const idxComment = commentList.findIndex(
      (el) => el._id.toString() === commentId
    );

    commentList[idxComment].comment = req.body.newComment;

    await Post.findByIdAndUpdate(postId, post);
    res.status(200).json({
      message: 'Update comment successfully',
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

const listSearch = (req, res) => {
  const query = {};
  if (req.query.name) {
    query.postTitle = { $regex: req.query.name, $options: 'i' };

    Post.find(query, (err, posts) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(posts);
    }).populate('topic');
  }
};

const getTrainingPoint = async (req, res) => {
  try {
    const userId = req.params.userId;
    const postList = await Post.find({ author: userId });
    const postList2 = await Post.find();

    const sumVoteUpPost = postList.reduce((a, b) => (a += b.upvote.length), 0);
    const sumVoteUpEvent = postList2.map((el) => el.postComment);

    const process2 = sumVoteUpEvent.reduce((a, b) => a.concat(b), []);
    const process3 = process2.filter(
      (el) => el.commentBy.toString() === userId
    );

    const process4 = process3.reduce((a, b) => (a += b.upvoteC.length), 0);

    res.json({
      data: sumVoteUpPost + process4,
    });
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
  deleteComment,
  updateComment,
  listSearch,
  getTrainingPoint,
};
