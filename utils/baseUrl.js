const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://murmuring-earth-67987.herokuapp.com/"
    : "http://localhost:3000";

export default baseUrl;
