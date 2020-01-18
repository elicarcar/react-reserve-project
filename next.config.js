// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      "mongodb+srv://EliCarcar:123qwe123@cluster0-6dtjp.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "nervalssister",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/nerval/image/upload",
    STRIPE_SECRET_KEY: "sk_test_N4HnHYGUlOxxqk0Bb6seWq1Z001XqIVdv1"
  }
};
