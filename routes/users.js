const router = require('express').Router();
const User = require('../models/User')

// CREATE NEW POST

router.get("/friends/:userId", async(req,res) => {
    
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(user.followings.map((fri_id) => {
            return User.frindById(fri_id);
        }));
        let friendList = [];
        friends.map((friend) => {
            const { _id,username, profilePicture} = friend;
            friendList.push({ _id, username, profilePicture})
        })
        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error)
    }
}) 


//FOLLOW A USER 

router.put("/:id/follow", async(req,res) => {
    
  if(req.body.userId != req.params.id){
    try{
        const user = await User.findById(req.params.id)
        const currentUser = await User.findById(req.body.userId)
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({ $push: { followers: req.body.userId}})
            await currentUser.updateOne({$push: { $followings: req.params.id}})

            res.status(200).json("User has been followed")

        } else {
            res.status(403).json(" You already followed this user ")
        }
    } catch (error) {
        res.status(500).json(err)
    }
  } else{
    res.status(403).json("You can't follow yourself")
  }
}) 


// UNFOLLOW USER

router.put("/:id/unfollow", async(req,res) => {
    
    if(req.body.userId != req.params.id){
      try{
          const user = await User.findById(req.params.id)
          const currentUser = await User.findById(req.body.userId)
          if(user.followers.includes(req.body.userId)){
              await user.updateOne({ $pull: { followers: req.body.userId}})
              await currentUser.updateOne({$pull: { $followings: req.params.id}})
  
              res.status(200).json("User has been unfollowed")
  
          } else {
              res.status(403).json(" You don't follow this user ")
          }
      } catch (error) {
          res.status(500).json(err)
      }
    } else{
      res.status(403).json("You can't follow yourself")
    }
  }) 
  