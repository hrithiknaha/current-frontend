import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import TV from "./pages/TV";
import Series from "./pages/Series";
import Season from "./pages/Season";
import Episode from "./pages/Episode";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="tv" element={<TV />} />
                    <Route path="" element={<PrivateRoute />}>
                        <Route path="tv/:tvId" element={<Series />} />
                        <Route path="tv/:tvId/season/:seasonNumber" element={<Season />} />
                        <Route path="tv/:tvId/season/:seasonNumber/episode/:episodeNumber" element={<Episode />} />
                        <Route path="movies/:movieId" element={<Movie />} />
                    </Route>

                    <Route path="profile" element={<PrivateRoute />}>
                        <Route path=":username" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
