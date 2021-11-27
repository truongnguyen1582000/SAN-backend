const Post = require('../models/postModel');

module.exports = {
  async create(req, res) {
    try {
      console.log(req.user);
      const newPost = await Post.create({
        ...req.body,
        author: req.user.id,
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
  },

  async getById(req, res) {
    try {
      res.status(200).json({
        message: 'Get post successfully',
        data: await Post.findById(req.params.id).populate('author'),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },

  async getAll(req, res) {
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
  },

  async deleteById(req, res) {
    try {
      //check user is admin or author

      const selectedPost = await Post.findById(req.params.id);

      console.log(
        { currentUser: req.user.id },
        { postUserId: selectedPost.id }
      );

      if (req.user.id === selectedPost.id) {
        return res.status(400).send('ok');
      }

      res.status(200).json({
        message: 'Get all post successfully',
        data: await Post.find(),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  },
};
