import "./App.css";
import Footer from "./components/fragments/Footer";
import Navbar from "./components/fragments/Navbar";

const App = () => {
  return (
    <div className="App flex flex-col bg-denflix-accent min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <h1 className="text-white p-10 text-center">Content Movie DenFlix...</h1>
      </main>
      <Footer />
    </div>
  );
};

export default App;
