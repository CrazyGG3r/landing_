import { useState, useEffect, useCallback, useRef } from 'react';
import { loadSettings, saveSettings, resetSettings, DEFAULT_SETTINGS } from '../storage.js';

export function useSettings() {
  const [layers, setLayers] = useState(DEFAULT_SETTINGS.layers);
  const [impact, setImpact] = useState(DEFAULT_SETTINGS.impact);
  const [noise, setNoise] = useState(DEFAULT_SETTINGS.noise);
  const [smoke, setSmoke] = useState(DEFAULT_SETTINGS.smoke);
  const [dither, setDither] = useState(DEFAULT_SETTINGS.dither);
  const [status, setStatus] = useState('loading');
  const saveTimer = useRef(null);

  useEffect(() => {
    loadSettings().then(s => {
      setLayers(s.layers);
      setImpact(s.impact ?? DEFAULT_SETTINGS.impact);
      setNoise(s.noise ?? DEFAULT_SETTINGS.noise);
      setSmoke(s.smoke ?? DEFAULT_SETTINGS.smoke);
      setDither(s.dither ?? DEFAULT_SETTINGS.dither);
      setStatus('loaded');
      setTimeout(() => setStatus('saved'), 1500);
    });
  }, []);

  const persist = useCallback((l, im, n, sm, d) => {
    setStatus('saving');
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => 
      saveSettings({ layers: l, impact: im, noise: n, smoke: sm, dither: d })
        .then(() => setStatus('saved')), 600);
  }, []);

  const updateLayer = useCallback((i, v, im, n, sm, d) => {
    setLayers(p => {
      const nx = p.map((l, j) => j === i ? v : l);
      persist(nx, im, n, sm, d);
      return nx;
    });
  }, [persist]);

  const updateImpact = useCallback((v, l, n, sm, d) => {
    setImpact(v);
    persist(l, v, n, sm, d);
  }, [persist]);

  const updateNoise = useCallback((p, l, im, sm, d) => {
    setNoise(pr => {
      const n = { ...pr, ...p };
      persist(l, im, n, sm, d);
      return n;
    });
  }, [persist]);

  const updateSmoke = useCallback((p, l, im, n, d) => {
    setSmoke(pr => {
      const sm = { ...pr, ...p };
      persist(l, im, n, sm, d);
      return sm;
    });
  }, [persist]);

  const updateDither = useCallback((p, l, im, n, sm) => {
    setDither(pr => {
      const d = { ...pr, ...p };
      persist(l, im, n, sm, d);
      return d;
    });
  }, [persist]);

  const reset = useCallback(async () => {
    const s = await resetSettings();
    setLayers(s.layers);
    setImpact(s.impact ?? DEFAULT_SETTINGS.impact);
    setNoise(s.noise);
    setSmoke(s.smoke);
    setDither(s.dither);
    setStatus('default');
    setTimeout(() => setStatus('saved'), 1500);
  }, []);

  return {
    layers, impact, noise, smoke, dither, status,
    updateLayer, updateImpact, updateNoise, updateSmoke, updateDither, reset
  };
}