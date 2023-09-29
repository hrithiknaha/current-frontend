import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import Series from "./pages/Series";
import Season from "./pages/Season";
import Episode from "./pages/Episode";
import Layout from "./components/configs/Layout";
import PrivateRoute from "./components/configs/PrivateRoute";
import Person from "./pages/Person";
import Stats from "./pages/Stats";
import MovieList from "./pages/MovieList";
import TVList from "./pages/TVList";
import Search from "./pages/Search";
import EpisodeList from "./pages/EpisodeList";
import Friends from "./pages/Friends";

function App() {
    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="search" element={<Search />} />
                    <Route path="" element={<PrivateRoute />}>
                        <Route index element={<Home />} />
                        <Route path="movies/:movieId" element={<Movie />} />
                        <Route path="tv/:tvId" element={<Series />} />
                        <Route path="tv/:tvId/season/:seasonNumber" element={<Season />} />
                        <Route path="tv/:tvId/season/:seasonNumber/episode/:episodeNumber" element={<Episode />} />
                        <Route path="person/:personId" element={<Person />} />
                        <Route path="profile/:username" element={<Profile />} />
                        <Route path="profile/:username/friends" element={<Friends />} />
                        <Route path="profile/:username/stats" element={<Stats />} />
                        <Route path="profile/:username/movie-list" element={<MovieList />} />
                        <Route path="profile/:username/tv-list" element={<TVList />} />
                        <Route path="profile/:username/tv-episodes-list" element={<EpisodeList />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
