import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import Categories from "./components/Categories/Categories";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;