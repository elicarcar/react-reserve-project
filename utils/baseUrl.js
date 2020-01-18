const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://react-reserve-eliC.herokuapp.sh"
    : "http://localhost:3000";

export default baseUrl;
