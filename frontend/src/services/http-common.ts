import axios from "axios";

const API_HOST = process.env.REACT_APP_API_HOST || "localhost";
const API_PORT = process.env.REACT_APP_API_PORT || 8080;
const API_PROTOCOL = process.env.API_PROTOCOL || "http";

export default axios.create({
  baseURL: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/api`,
  headers: {
    "Content-type": "application/json"
  }
});
