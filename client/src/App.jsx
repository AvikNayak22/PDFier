import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="h-[100vh]">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
};

export default App;
