import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;
  try {
    //check user if it exists with the provided email
    const user = await User.findOne({ email }).select("+password");
    // --if not return error
    if (!user) {
      res.status(404).send("Wrong credentials");
    }
    // check to see if users password matches the one with the db
    const passwordsMatch = await bcrypt.compare(password, user.password);
    //if soo generate a token
    if (passwordsMatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.status(200).json(token);
    } else {
      res.status(401).send("Invalid credentials");
    }
    //send that token to the client
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error", error);
  }
};
