import express from "express";
import { createPost, getPost, getOwnPost, deletePost, editPost } from "../controller/post.controller.js";
// import PostModel from "../models/Post.model.js";

//Setting a route
const router = express.Router();

router.post("/", createPost).post("/deletePost/:_id", deletePost);
router.get("/getPost/:_id", getPost)
router.get("/getOwnPost/:_id", getOwnPost)
router.post("/editPost/:_id/:content", editPost)

export default router;
