import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Trending from "./pages/Trending";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
      </Routes>
    </div>
  )
}

export default App;