import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="movies" element={<Movies />} />
                    <Route path="movies/:movieId" element={<Movie />} />
                    <Route path="profile" element={<PrivateRoute />}>
                        <Route path=":username" element={<Profile />} />
                    </Route>
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
