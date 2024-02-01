import { response } from "express";
import PostModel from "../models/Post.model.js";

export const createPost = async (req, res, next) => {
  try {
    const data = await PostModel.create(req.body);

    res.status(201).json({
      createdAt: data.createdAt,
      createdBy: data.createdBy,
      content: data.createdBy,
    });
    //Test Possible Errors
  } catch (err) {
    if (err.code === 11000) {
      const email = err?.keyValue?.email;
      return res.status(400).json({
        status: "fail",
        message: `Post can't be empty!`,
      });
    }
    res.status(400).json(err);
  }
};

//Delete User Post
export const deletePost = async (req, res, next) => {
  try {
    const {_id} = req.params;
    const post = await PostModel.deleteOne({ _id });
    res.status(200).json({message:"success", data:post});
  } catch (er) {
    console.log(er);
  }
};

//Edit Post
export const editPost = async (req, res, next) => {
  const {_id,content} = req.params;
  const filter = { _id: _id};
  const update = { $set: { content: content } };

  PostModel.findOneAndUpdate(filter, update).exec(function (err, post) {
    //error is found
    if (err) {
      console.log(err);
      res.status(500).send(err);
      //Post not found
    }  else {
      console.log("Content is Updated!");
      res.status(200).send(post);
    }
  });
};

//Get post with constraints
export const getPost = async (req, res, next) => {
  try {
    const {_id} = req.params;
    const constraint = JSON.parse(_id)
    const post = await PostModel.find({'createdBy': {$in:constraint}})
    res.status(200).json({message:"success", data:post})
  } catch (er) {
    console.log(er);
  }
};

//Get own post
export const getOwnPost = async (req, res, next) => {
  try {
    const {_id} = req.params;
    const post = await PostModel.find({"createdBy":_id});
    res.status(200).json({message:"success", data:post});
  } catch (er) {
    console.log(er);
  }
};



