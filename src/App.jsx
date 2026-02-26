import { Routes, Route } from "react-router-dom";
import Blur from "./blur";        // assuming blur/index.jsx exports default
import Research from "./research"; // assuming research/index.jsx exports default

function Home() {
  return <h1>Home Page</h1>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blur" element={<Blur />} />
      <Route path="/research" element={<Research />} />
    </Routes>
  );
}