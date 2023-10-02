const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat-app-133e9.web.app');
  // Add other CORS headers as needed
  next();
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.status(200).json({ msg: "Username already used", status: false });
    const checkEmail = await User.findOne({ email });
    if (checkEmail)
      return res.status(200).json({ msg: "Email already used", status: false });
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });
    delete user.password;
    return res.status(200).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.login = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat-app-133e9.web.app');
  // Add other CORS headers as needed
  next();
  try {
    const { username, email, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.status(200).json({
        msg: "Incorrect unsername or password",
        status: false,
      });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(200).json({
        msg: "Incorrect password or username ",
        status: false,
      });

    delete user.password;
    return res.status(200).json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat-app-133e9.web.app');
  // Add other CORS headers as needed
  next();
    try {
      const userId = req.params.id;
      const avaterImage = req.body.image;
      const userData = await User.findByIdAndUpdate(
        userId,
        {
          isAvaterImageSet: true,
          avaterImage,
        },
        { new: true } // Correct placement of the option
      );// Check if the updated data is logged
  
      return res.status(200).json({
        isSet: userData.isAvaterImageSet,
        image: userData.avaterImage,
      });
    } catch (err) {
      next(err);
    }
  };
module.exports.allUserRoute = async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat-app-133e9.web.app');
  // Add other CORS headers as needed
  next();
    try {
      const userId = req.params.id;
      // console.log(userId)
      const users = await User.find({ _id: { $ne: req.params.id } }).select(["email","username","avaterImage",'_id'])
      return res.status(200).json(users)
    } catch (err) {
      next(err);
    }
    


  };

  
  
  
  
  