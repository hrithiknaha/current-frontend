import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SearchMovies from "./pages/SearchMovies";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import SearchTV from "./pages/SearchTV";
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

function App ()
{
    return (
        <Router>
            <Toaster />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="search" element={<Search />} />
                    <Route path="" element={<PrivateRoute />}>
                        <Route path="movies" element={<SearchMovies />} />
                        <Route path="movies/list" element={<MovieList />} />
                        <Route path="movies/:movieId" element={<Movie />} />
                        <Route path="tv" element={<SearchTV />} />
                        <Route path="tv/list" element={<TVList />} />
                        <Route path="tv/:tvId" element={<Series />} />
                        <Route path="tv/:tvId/season/:seasonNumber" element={<Season />} />
                        <Route path="tv/:tvId/season/:seasonNumber/episode/:episodeNumber" element={<Episode />} />
                        <Route path="person/:personId" element={<Person />} />
                        <Route path="profile/:username" element={<Profile />} />
                        <Route path="profile/:username/stats" element={<Stats />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
