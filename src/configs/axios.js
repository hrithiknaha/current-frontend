// utils/axiosConfig.js
import axios from "axios";

const axiosPublicInstance = axios.create({
    baseURL: "http://localhost:5001/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const axiosPrivateInstance = (auth) =>
    axios.create({
        baseURL: "http://localhost:5001",
        timeout: 10000,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
        },
    });

export { axiosPublicInstance, axiosPrivateInstance };
