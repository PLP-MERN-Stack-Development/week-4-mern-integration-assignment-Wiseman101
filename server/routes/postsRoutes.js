const express = require('express');
const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Public Routes
router.get("/", getAllPosts);            // GET all posts
router.get("/:id", getPostById);         // GET single post

// Protected Routes (need token)
router.post("/", verifyToken, upload.single("image"), createPost); // POST with image
router.put("/:id", verifyToken, updatePost);  // UPDATE post
router.delete("/:id", verifyToken, deletePost); // DELETE post

module.exports = router;

// (Removed duplicate CommonJS code in favor of ES Modules below)
//   }
// });

// // CREATE post
// router.post('/', async (req, res, next) => {
//   try {
//     const { error } = postSchema.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     const newPost = new Post(req.body);
//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
//   } catch (err) {
//     next(err);
//   }
// });

// // UPDATE post
// router.put('/:id', async (req, res, next) => {
//   try {
//     const { error } = postSchema.validate(req.body);
//     if (error) return res.status(400).json({ error: error.details[0].message });

//     const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedPost) return res.status(404).json({ error: 'Post not found' });
//     res.json(updatedPost);
//   } catch (err) {
//     next(err);
//   }
// });

// // DELETE post
// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deletedPost = await Post.findByIdAndDelete(req.params.id);
//     if (!deletedPost) return res.status(404).json({ error: 'Post not found' });
//     res.json({ message: 'Post deleted' });
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

// // import express from "express";
// // import {
// //   getAllPosts,
// //   getPostById,
// //   createPost,
// //   updatePost,
// //   deletePost,
// // } from "../controllers/postController.js";
// // import { verifyToken } from "../middleware/authMiddleware.js";
// // import upload from "../middleware/upload.js";

// // const router = express.Router();

// // // @route   GET /api/posts
// // router.get("/", getAllPosts);

// // // @route   GET /api/posts/:id
// // router.get("/:id", getPostById);

// // // @route   POST /api/posts (with image upload)
// // router.post("/", verifyToken, upload.single("image"), createPost);

// // // @route   PUT /api/posts/:id
// // router.put("/:id", verifyToken, updatePost);

// // // @route   DELETE /api/posts/:id
// // router.delete("/:id", verifyToken, deletePost);

// // export default router;
