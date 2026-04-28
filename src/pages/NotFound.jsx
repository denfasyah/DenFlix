import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center py-20 justify-center text-center">
      {/* Besar Angka 404 dengan Glow */}
      <h1 className="text-[120px] md:text-[200px] font-black text-white leading-none opacity-20 absolute select-none">
        404
      </h1>
      
      <div className="relative z-10">
        <div className="text-6xl mb-6">🍿</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          Sepertinya film yang kamu cari sudah "tamat" atau URL yang kamu masukkan salah alamat.
        </p>
        
        <Link 
          to="/" 
          className="btn bg-denflix-primary hover:bg-yellow-500 border-none text-black font-bold px-8 rounded-full flex items-center gap-2 mx-auto w-fit transition-transform active:scale-95"
        >
          <AiOutlineHome className="text-xl" />
          BACK TO HOME
        </Link>
      </div>
    </div>
  );
};

export default NotFound;