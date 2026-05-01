import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";
import { AuthContextProvider } from "./context/AuthContext";
// import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div className="App flex flex-col bg-denflix-accent min-h-screen">
      <AuthContextProvider>
        {/* <Toaster /> */}
        <Navbar />
        <main className="flex-grow pt-16">
          <AppRoutes />
        </main>
        <Footer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
