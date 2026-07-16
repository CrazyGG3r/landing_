import { Routes, Route } from "react-router-dom";
// import Landing from "./home";
import Blur from "./blur";
import Blur1 from "./blur1";
import Home from "./home";
import Portfolio from "./portfolio/Portfolio";
import EntryScene from "./portfolio/EntryScene";
import Glass from "./portfolio/Glass";
import Research from "./assignment/research";
import NotFound from "./NotFound";
import AMPReaderScreen from "./AMPReaderScreen";
import Kitchen from "./home copy/Landing"
import Scribble from "./nextmodel/Landing"
import Dashboard from "./iot_testing/Landing"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/portfolio" element={<Portfolio />} />
      <Route path="/entry" element={<EntryScene />} />
      {/* Sandboxed embed target: the EntryScene CRT screen hosts the AMP reader
          here and rasterizes it to a texture behind the VHS filter. */}
      <Route path="/__vhs_screen" element={<AMPReaderScreen />} />
      <Route path="/glass" element={<Glass />} />
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
