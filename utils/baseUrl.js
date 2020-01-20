const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://react-reserve-elic.herokuapp.com"
    : "http://localhost:3000";

export default baseUrl;
