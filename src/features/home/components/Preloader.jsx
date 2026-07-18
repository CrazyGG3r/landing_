import { useEffect, useRef } from 'react'
import { preloadBinary, preloadImages, preloadJson } from '../core/assetCache'

export default function Preloader({
  onLoadComplete,
  assets = { images: [], json: [], binary: [], preloaders: [] },
  maxWaitMs = 2500,
}) {
  const onLoadCompleteRef = useRef(onLoadComplete)

  useEffect(() => {
    onLoadCompleteRef.current = onLoadComplete
  }, [onLoadComplete])

  useEffect(() => {
    const images = Array.from(new Set((assets?.images || []).filter(Boolean)))
    const json = Array.from(new Set((assets?.json || []).filter(Boolean)))
    const binary = Array.from(new Set((assets?.binary || []).filter(Boolean)))
    const preloaders = Array.isArray(assets?.preloaders) ? assets.preloaders : []

    let cancelled = false
    let completed = false
    const finish = () => {
      if (cancelled || completed) return
      completed = true
      onLoadCompleteRef.current?.()
    }
    const timer = setTimeout(finish, maxWaitMs)

    const tasks = []
    if (images.length) tasks.push(preloadImages(images))
    if (json.length) tasks.push(preloadJson(json))
    if (binary.length) tasks.push(preloadBinary(binary))

    preloaders.forEach((preload) => {
      try {
        const result = preload?.()
        if (result && typeof result.then === 'function') tasks.push(result)
      } catch (error) {
        console.warn('A non-critical preload task was skipped.', error)
      }
    })

    if (tasks.length === 0) {
      queueMicrotask(finish)
    } else {
      Promise.allSettled(tasks).then(finish)
    }

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [assets, maxWaitMs])

  return null
}
