const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Profile = require('../models/Post');

const vertify =  passport.authenticate('jwt', { session: false });
const control = require('../controllers/Posts')



router.get('/', (req, res) => {
    control.getPosts(req,res);
  }
);

router.get('/:postId', (req, res) => {
  control.getPostsById(req,res);
}
);

router.post('/',vertify , (req, res) => {
    control.createPost(req,res);
  }
);

router.delete('/:postId',vertify , (req, res) => {
  control.deletePost(req,res);
  }
);
  
router.post('/like/:id', vertify,(req, res) => {
  control.likePost(req,res);
  }
);

router.post('/unlike/:id',vertify,(req, res) => {
  control.unlikePost(req,res);
  }
);

router.post('/comment/:postId',vertify, (req, res) => {
  control.commentPost(req,res);
  }
);




// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
