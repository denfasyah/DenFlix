import { Routes, Route} from "react-router-dom";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MovieDetail from "../pages/MovieDetail";
import MovieCategory from "../pages/MovieCategory";
import { Suspense } from "react";
import Loading from "../components/common/Loading";
import NotFound from "../pages/NotFound";
import GenrePage from "../pages/GenrePage";
import TvDetail from "../pages/TvDetail";
import TvCategory from "../pages/TvCategory";
import CastCategory from "../pages/CastCategory";
import CastDetail from "../pages/CastDetail"; 

const AppRoutes = () => {
  return (
    <div>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:category" element={<MovieCategory />} />
            <Route path="/movie/detail/:id" element={<MovieDetail />} />
            <Route path="/genre/:id" element={<GenrePage />} />
            <Route path="/tv/:category" element={<TvCategory />} />
            <Route path="/tv/detail/:id" element={<TvDetail />} />
            <Route path="/person/detail/:id" element={<CastDetail />} />
            <Route path="/person/:category" element={<CastCategory />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
    </div>
  );
};

export default AppRoutes;
