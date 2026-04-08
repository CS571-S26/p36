import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllComps from "./pages/AllComps";
import BuildComp from "./pages/BuildComp";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comps" element={<AllComps />} />
        <Route path="/comps/:compId" element={<AllComps />} />
        <Route path="/build-comp" element={<BuildComp />} />
      </Routes>
    </div>
  )
}

export default App;