var express = require('express');
const User = require('../models/user');
var router = express.Router();

// Create a Signin Route
router.post('/signup', async (req, res, next) => {
  const {fullName, email, password} = req.body;

  try {
    await User.create({fullName,email,password})

    return res.status(200).json({ success: true, msg: "User Created Successfully" })
  } catch (error) {
    console.log(error)
    if(error.code = 11000) {
      return res.status(500).json({ success: false, msg: "Email Id Already Exists" })
}
    return res.status(500).json({ success: false, msg: "Server Error" })
  }


});



router.post('/signin', async (req, res, next) => {
  const { email, password} = req.body;

  try {
    const user = await User.matchPassword(email, password)
    
    return res.status(200).json({ success: true, msg: "Login sucessfully", user })
  } catch (error) {
    console.log(error)
 
    return res.status(500).json({ success: false, msg: "Incorrect Email Or Password" })
  }


});


module.exports = router;
