import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h4>Current</h4>
            <div>
                <Link to={"/movies"}>Movies</Link>
            </div>
            <div>
                <Link to={"/tv"}>TV</Link>
            </div>
        </div>
    );
}

export default Home;
