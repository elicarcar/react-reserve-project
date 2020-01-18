import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";
connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).send(`User already exist with email ${email}.`);
    }

    if (isLength(name, { min: 3, max: 8 })) {
      return res
        .status(422)
        .send(`User name must be at least 3 and maximum 8 characters long.`);
    } else if (!isEmail(email)) {
      return res.status(422).send(`${email} is not a valid email.`);
    } else if (!isLength(password, { min: 6, max: 12 })) {
      return res
        .status(422)
        .send(`Password should be at least 3 and maximum 8 characters long.`);
    }

    //send an error if user exists
    // --if not, hash the password
    const hash = await bcrypt.hash(password, 10);
    /// create user
    const newUser = await new User({
      name,
      email,
      password: hash
    }).save();
    //create a cart for user
    await new Cart({ user: newUser._id }).save();

    //create a token for the new user
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    //send back token
    res.status(201).json(token);
  } catch (error) {
    console.error(error);
    res.status(500).send("A problem has occurred while creating a new user");
  }
};
