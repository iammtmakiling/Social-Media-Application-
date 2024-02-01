
import UserModel from "../models/User.model.js";

//Creates User
export const createUser = async (req,res,next) => {
    try {
        const data = await UserModel.create(req.body);

        // Send user data
        res.status(201).json({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            friends: data.friends,
            friendRequest: data.friendRequest,
            pendingRequest: data.friendRequest,
            name: data.name,
            _id: data._id,
        });
    } catch (err) {
        if (err.code === 11000) {
            const email = err?.keyValue?.email;
            return res.status(400).json({
                status: 'fail',
                message: `The email ${email} is already taken`,
            });
        }
        res.status(400).json(err);
    }
}

//Gets Users other than the given constraint
export const getOtherUsers = async (req, res, next) => {
    try {
      const {_id} = req.params;
      const constraint = JSON.parse(_id);
      if (constraint != []){
        const user = await UserModel.find({ _id: { $nin: constraint } })
        res.status(200).json({message:"success", data:user})
      }
    } catch (er) {
      console.log(er);
    }
}

//Gets All Users
export const getAllUsers = async (req, res, next) => {
  try {
    const user = await UserModel.find({})
    res.status(200).json({message:"success", data:user})
  } catch (er) {
    console.log(er);
  }
}

//Accepting of Friend Requests
export const acceptRequest = async (req, res, next) => {
    try {
        const {friend_id,_id} = req.params;

        if (_id != 'undefined' && friend_id != 'undefined'){
          
          const update = { $pull: { friendRequest: friend_id }, $push: {friends: friend_id} };
           //Removes from friend request, and Added to friends
          UserModel.findByIdAndUpdate(_id, update).exec(function (err, user) {
              //error is found
              if (err) {
                console.log(err);
                res.status(500).send(err);
              //Content Updated
              }  else {
                console.log("Friend Added");
              //   console.log(user);
                res.status(200).send(user);
              }
          });

          //Removes from pending request, and Added to friends
          const update2 = { $pull: { pendingRequest: _id }, $push: {friends: _id} };
          UserModel.findByIdAndUpdate(friend_id, update2).exec(function (err, user) {
              //error is found
              if (err) {
                console.log(err);
                res.status(500).send(err);
              //Content Updated
              }  else {
                console.log("Removed from pending request");
              }
          });
        }
    } catch (er) {
        console.log(er);
    }
}

//Rejecting of Friend Requests
export const rejectRequest = async (req, res, next) => {
    try {
        const {friend_id,_id} = req.params;
        if (_id != 'undefined'){
          //Removes from friend request
          const update = { $pull: { friendRequest: friend_id }};
          UserModel.findByIdAndUpdate(_id, update).exec(function (err, user) {
            //error is found
            if (err) {
              console.log(err);
              res.status(500).send(err);
            //Content Updated
            }  else {
              console.log("Content is Updated!");
            //   console.log(user);
              res.status(200).send(user);
            }
          });

          // Removes from pending request
          const update2 = { $pull: { pendingRequest: _id }};
          UserModel.findByIdAndUpdate(friend_id, update2).exec(function (err, user) {
            //error is found
            if (err) {
              console.log(err);
              res.status(500).send(err);
            //Content Updated
            }  else {
              console.log("Removed from pending request");
            }
          });
        }
    } catch (er) {
        console.log(er);
    }
}

//Gets User
export const getUser = async (req, res, next) => {
    try {
        const {_id} = req.params;
        if (_id != 'undefined'){
            const user = await UserModel.findById({_id})
            res.status(200).json({message:"success", data:user})
        }
    } catch (er) {
        console.log(er);
    }
};

//Add Friend
export const addFriend = async (req, res, next) => {
    try {
        const {friend_id,_id} = req.params;
        if (_id != 'undefined'){
            const update = { $push: { friendRequest: _id}};
            UserModel.findByIdAndUpdate(friend_id, update).exec(function (err, user) {
              //error is found
              if (err) {
                console.log(err);
                res.status(500).send(err);
                //User not found
              }  else {
                console.log("Content is Updated!");
              //   console.log(user);
                res.status(200).send(user);
              }
            });
            const update2 = { $push: { pendingRequest: friend_id}};
            UserModel.findByIdAndUpdate(_id, update2).exec(function (err, user) {
              //error is found
              if (err) {
                console.log(err);
                res.status(500).send(err);
                //User not found
              }  else {
                console.log("Content is Updated!");
              }
            });
        }
    } catch (er) {
        console.log(er);
    }
};

//Login User
export const logInUser = async (req, res, next) => {
    try {
        const data = req.body;
        const user = await UserModel.findOne({email: data.email}).select(
            '+password'
        );
        
        //Checks if Email does exist
        if (!user) throw new Error('User does not exist');

        //Compare Password
        if (!(await user.comparePassword(data.password)))
            throw new Error('Incorrect Passord');
    
        res.status(200).json({status: "success", 
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            friends: user.friends,
            friendRequest: user.friendRequest,
            pendingRequest : user.pendingRequest,
            _id: user._id,
            name: user.name,
        })
    } catch (err) {
        //Default Error Code
        res.status(401).json({status: 'fail', message: err.message});
    }

}