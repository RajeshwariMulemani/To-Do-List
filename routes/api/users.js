const express = require('express');

const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys_dev');


// Load Input Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');
const validateNotesData = require('../../validation/validateNotesData')
// Load User model
const User = require('../../models/User');
const UserNotes = require('../../models/Notes')

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
     

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        usertype:req.body.usertype,
        password: req.body.password,
       
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
             
              const payload = {usertype:user.usertype, id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

              // Sign Token
              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: 'Bearer ' + token
                  });
                }
              );
              
            })
            .catch(err => console.log(err));
        });
      });


    }
  });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Matched
        const payload = {usertype:user.usertype, id: user.id, name: user.name, avatar: user.avatar }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token
            });
          }
        );
      } else {
        errors.password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    });
  });
});



// @route   POST api/users/addnotes
// @desc    Register user
// @access  Public
router.post('/addnotes', async(req, res) => {
  const { errors, isValid } = validateNotesData(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }


  let noteData = new  UserNotes(
    {
      title: req.body.title,
      notes: req.body.notes,
      notes_date:req.body.notes_date,
      userId: req.body.userId,
     
    }
  )


  await noteData.save()

  res.send({message:"Notes added successfully"})



});



// @route   POST api/users/getnotes
// @desc    Register user
// @access  Public
router.get('/getnotes/:userId', async(req, res) => {



  let startOfDay = new Date(req.query.notes_date)
  
  let endOfDay = new Date(req.query.notes_date)

	startOfDay.setHours(0, 0, 0, 0);

  endOfDay.setHours(23, 59, 59, 999);

 
  console.log(startOfDay, endOfDay , req.query.notes_date)


  let noteData = await UserNotes.find({userId:req.params.userId,notes_date:{$gte:startOfDay,$lte:endOfDay}})

  

  res.send(noteData)



});




module.exports = router;
