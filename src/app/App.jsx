import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  loadEntryRoute,
  loadPortfolioRoute,
} from '../shared/performance/routePreloader'

const Home = lazy(() => import('../features/home/Landing.jsx'))
const Portfolio = lazy(loadPortfolioRoute)
const EntryScene = lazy(loadEntryRoute)
const AMPReaderScreen = lazy(() =>
  import('../features/amp-reader/AMPReaderScreen'),
)
const Glass = lazy(() => import('../features/portfolio/Glass'))
const Blur = lazy(() => import('../features/blur'))
const Blur1 = lazy(() => import('../features/blur-next'))
const Research = lazy(() => import('../features/research'))
const NotFound = lazy(() => import('./NotFound'))
const Kitchen = lazy(() => import('../features/animation/Landing'))
const Scribble = lazy(() => import('../features/model-playground/Landing'))
const Dashboard = lazy(() => import('../features/dashboard/Landing'))

export default function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route
          path="/"
          element={(
            <Home
              terminalEffectsIntensity={1.3}
              terminalEmissionFlickerIntensity={0.8}
              terminalEmissionFlickerFrequency={1}
              terminalCornerBloomIntensity={1.4}
              terminalCornerBloomEmission={1.2}
              terminalCornerBloomColor="#bfe9f3"
              terminalLensBlurIntensity={1}
              terminalLensBlurRange={0.24}
              terminalLensChromaticIntensity={1}
              terminalLensChromaticRange={0.24}
            />
          )}
        />
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
    </Suspense>
  )
}
