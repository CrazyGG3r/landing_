import { Routes, Route } from "react-router-dom";
import Blur from "./blur";
import Research from "./research";
import NotFound from "./NotFound";

function Home() {
  return <h1>Home Page</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blur" element={<Blur />} />
      <Route path="/research" element={<Research />} />

      {/* Must be last */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}