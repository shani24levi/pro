const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../models/Profile');

const vertify =  passport.authenticate('jwt', { session: false });
const control = require('../controllers/Profile')



router.get('/', vertify , (req, res) => {
    control.getCurrentUser(req,res);
  }
);


router.get('/all', (req, res) => {
    control.getAll(req,res);
  }
);
 

router.get('/handle/:handle', (req, res) => {
    control.getByHandle(req,res);
  }
);
 
router.get('/user/:user_id', (req, res) => {
    control.getByUserId(req,res);
  }
);

router.post('/', vertify ,(req, res) => {
    control.creatProfile(req,res);
  }
);

router.put('/',vertify, (req,res)=>{
  control.updeateProfile(req,res);
});
  

router.delete('/', vertify ,(req, res) => {
  control.deleteProfile(req,res);
}
);


router.post('/myRentals/add', vertify, (req,res)=>{
  control.myReantalAdd(req,res);
});

router.delete('/myRentals/:rentId', vertify, (req,res)=>{
  control.myReantalDelete(req,res);
});

router.post('/apartment/add', vertify, (req,res)=>{
  control.myApartmentAdd(req,res);
});

//router.delete('/Deleteuser', vertify, (req,res)=>{
//  control.Deleteuser(req,res);
//});










// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to exp array
      profile.experience.unshift(newExp);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldofstudy: req.body.fieldofstudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      // Add to edu array
      profile.education.unshift(newEdu);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // Splice out of array
        profile.experience.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // Splice out of array
        profile.education.splice(removeIndex, 1);

        // Save
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);




module.exports = router;
