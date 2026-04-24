import { Link } from "react-router-dom";
const HeaderMovieList = ({title, url}) => {
  return (
    <div className="flex items-center px-4 pt-2">
      <h1 className="text-denflix-primary font-semibold text-xl tracking-wide">
        {title}
      </h1>
      <Link
        to={url}
        className="ml-auto text-sm text-gray-400 hover:text-denflix-primary transition-colors"
      >
        View All
      </Link>
    </div>
  );
};

export default HeaderMovieList;
