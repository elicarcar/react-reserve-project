const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://react-reserve-eliC.now.sh"
    : "http://localhost:3000";

export default baseUrl;
