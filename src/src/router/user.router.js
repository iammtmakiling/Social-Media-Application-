import express from 'express';
import { createUser, logInUser, getOtherUsers, getUser, addFriend, acceptRequest, rejectRequest, getAllUsers } from "../controller/user.controller.js";


//Setting a route
const router = express.Router();

router.post("/", createUser);
router.post('/log-in', logInUser);
router.post('/addFriend/:friend_id/:_id',addFriend);
router.post('/acceptRequest/:friend_id/:_id',acceptRequest);
router.post('/rejectRequest/:friend_id/:_id',rejectRequest);
router.get('/getOtherUsers/:_id',getOtherUsers).get('/getUser/:_id',getUser).get('/getAllUsers/', getAllUsers)

export default router;