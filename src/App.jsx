import { Routes, Route } from "react-router-dom";
// import Landing from "./home";
import Blur from "./blur";
import Blur1 from "./blur1";
import Home from "./home";
import Portfolio from "./portfolio/Portfolio";
import P1 from "./portfolio/Portfolio_";
import Research from "./assignment/research";
import NotFound from "./NotFound";
import Kitchen from "./home copy/Landing"
import Scribble from "./nextmodel/Landing"
import Dashboard from "./iot_testing/Landing"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/p1" element={<P1 />} />
      <Route path="/blur" element={<Blur />} />
      <Route path="/blur1" element={<Blur1 />} />
      <Route path="/assignment/research" element={<Research />} />
      <Route path="/animation" element={<Kitchen />} />
      <Route path="/test" element={<Scribble />} />
      <Route path="/pi_dashboard" element={<Dashboard />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}