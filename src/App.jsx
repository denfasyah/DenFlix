import "./App.css";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/navbar/Navbar";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="App flex flex-col bg-denflix-accent min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
};

export default App;
