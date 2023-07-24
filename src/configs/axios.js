// utils/axiosConfig.js
import axios from "axios";

const axiosPublicInstance = axios.create({
    baseURL: "https://current-api.onrender.com/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosPrivateInstance = (auth) =>
    axios.create({
        baseURL: "https://current-api.onrender.com/",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
        },
    });

export { axiosPublicInstance, axiosPrivateInstance };
