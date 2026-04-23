import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import Trending from '../pages/Trending'
import Search from '../pages/Search'
import MovieDetail from '../pages/MovieDetail'      

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
    </div>
  )
}

export default AppRoutes