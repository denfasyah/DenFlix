import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetail from "../pages/MovieDetail";
import MovieCategory from "../pages/MovieCategory";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:category" element={<MovieCategory />} />
        <Route path="/movie/detail/:id" element={<MovieDetail />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
