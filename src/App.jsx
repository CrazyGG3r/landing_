import { Routes, Route } from "react-router-dom";
// import Landing from "./home";
import Blur from "./blur";
import Blur1 from "./blur1";
import Home from "./home";
import Research from "./assignment/research";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blur" element={<Blur />} />
      <Route path="/blur1" element={<Blur1 />} />
      <Route path="/assignment/research" element={<Research />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}