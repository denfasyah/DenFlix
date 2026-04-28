import { Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetail from "../pages/MovieDetail";
import MovieCategory from "../pages/MovieCategory";
import { Suspense } from "react";
import Loading from "../components/common/Loading";
import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <div>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:category" element={<MovieCategory />} />
            <Route path="/movie/detail/:id" element={<MovieDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
    </div>
  );
};

export default AppRoutes;
