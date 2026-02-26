import { Routes, Route } from "react-router-dom";
import Blur from "./blur";
import Home from "./Home";  // Remove .jsx extension (optional but cleaner)
import Research from "./research";
import NotFound from "./NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />  {/* Now uses the imported Home */}
      <Route path="/blur" element={<Blur />} />
      <Route path="/research" element={<Research />} />

      {/* Must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}