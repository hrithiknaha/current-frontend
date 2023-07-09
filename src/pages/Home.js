import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h4>Current</h4>
            <Link to="/auth">Login</Link>
        </div>
    );
}

export default Home;
