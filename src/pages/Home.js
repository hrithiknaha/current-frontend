import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 flex-col">
            <div className="text-center">
                <h1 className="mx-auto  text-6xl font-bold mb-4">⚡️ Zap ⚡️</h1>
                <p className="text-sm bg-gray-200 inline px-4 py-2 my-4 rounded">Don't forget to study too.</p>
            </div>
            <div className="flex w-48 justify-evenly my-8">
                <Link to="movies">
                    <button className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                        Movies
                    </button>
                </Link>
                <Link to="tv">
                    <button className="bg-white hover:bg-blue-500 text-blue-500 hover:text-white font-semibold py-2 px-4 rounded outline">
                        TV
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
