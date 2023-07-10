import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="movies/:movieId" element={<Movie />} />
                    <Route path="profile/:username" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
