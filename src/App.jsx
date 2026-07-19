import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  loadEntryRoute,
  loadPortfolioRoute,
} from './performance/routePreloader'

const Home = lazy(() => import('./home'))
const Portfolio = lazy(loadPortfolioRoute)
const EntryScene = lazy(loadEntryRoute)
const AMPReaderScreen = lazy(() => import('./AMPReaderScreen'))
const Glass = lazy(() => import('./portfolio/Glass'))
const Blur = lazy(() => import('./blur'))
const Blur1 = lazy(() => import('./blur1'))
const Research = lazy(() => import('./assignment/research'))
const NotFound = lazy(() => import('./NotFound'))
const Kitchen = lazy(() => import('./home copy/Landing'))
const Scribble = lazy(() => import('./nextmodel/Landing'))
const Dashboard = lazy(() => import('./iot_testing/Landing'))

export default function App() {
  return (
    <Suspense fallback={null}>
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
    </Suspense>
  )
}
