import { Routes, Route } from "react-router-dom";
import Blur from "./blur";
import Blur1 from "./blur1";
import Home from "./Home";  // Remove .jsx extension (optional but cleaner)
import Research from "./assignment/research";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Now uses the imported Home */}
      <Route path="/blur" element={<Blur />} />
      <Route path="/blur1" element={<Blur />} />
      <Route path="/assignment/research" element={<Research />} />

      {/* Must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}