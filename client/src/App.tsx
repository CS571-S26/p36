import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AllComps from "./pages/AllComps";
import BuildComp from "./pages/BuildComp";
import MyComps from "./pages/MyComps";
import Bookmarks from "./pages/Bookmarks";
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
        <Route path='/users/:username/mycomps' element={<MyComps />} />
        <Route path='/users/:username/mycomps/:compId' element={<MyComps />} />
        <Route path='/users/:username/bookmarks' element={<Bookmarks />} />
        <Route path='/users/:username/bookmarks/:compId' element={<MyComps />} />
      </Routes>
    </div>
  )
}

export default App;