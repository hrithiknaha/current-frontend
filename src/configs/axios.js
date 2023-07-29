// utils/axiosConfig.js
import axios from "axios";

const isDevelopment = process.env.NODE_ENV === "development";

// Set the base URL accordingly
const baseURL = isDevelopment ? "http://localhost:5001" : "https://current-api.onrender.com"; // Replace this with your actual production URL

const axiosPublicInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosPrivateInstance = (auth) =>
    axios.create({
        baseURL,
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
        },
    });

export { axiosPublicInstance, axiosPrivateInstance };
