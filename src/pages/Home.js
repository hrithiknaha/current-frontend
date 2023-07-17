import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h4>Current</h4>
            <Link to={"/movies"}>Movies</Link>
            <Link to={"/tv"}>TV</Link>
        </div>
    );
}

export default Home;
