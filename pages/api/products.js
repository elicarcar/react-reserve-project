import connectDb from "../../utils/connectDb.js";
import Product from "../../models/Product";

connectDb();
export default async (req, res) => {
  const { page, size } = req.query;
  //convert the quer string values to values
  const pageNum = Number(page);
  const pageSize = Number(size);
  let products = [];
  const totalDocs = await Product.countDocuments();
  const totalPages = Math.ceil(totalDocs / pageSize);
  if (pageNum === 1) {
    products = await Product.find().limit(pageSize);
  } else {
    const skips = pageSize * (pageNum - 1);
    products = await Product.find()
      .skip(skips)
      .limit(pageSize);
  }
  // const products = await Product.find();
  res.status(200).json({ products, totalPages });
};
