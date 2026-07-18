import { useCallback, useEffect, useRef, useState } from 'react'

export function useDeadZonesFromRefs(
  containerRef,
  elementRefs = [],
  enabled = true,
) {
  const [deadZones, setDeadZones] = useState([])
  const timerRef = useRef(null)

  const compute = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    if (containerRect.width <= 0 || containerRect.height <= 0) return
    const zones = []
    elementRefs.forEach((ref) => {
      const element = ref?.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      zones.push({
        x1: (rect.left - containerRect.left) / containerRect.width,
        x2: (rect.right - containerRect.left) / containerRect.width,
        y1: 1 - (rect.bottom - containerRect.top) / containerRect.height,
        y2: 1 - (rect.top - containerRect.top) / containerRect.height,
      })
    })
    setDeadZones((current) => {
      const unchanged =
        current.length === zones.length &&
        current.every((zone, index) => {
          const next = zones[index]
          return (
            Math.abs(zone.x1 - next.x1) < 0.0005 &&
            Math.abs(zone.x2 - next.x2) < 0.0005 &&
            Math.abs(zone.y1 - next.y1) < 0.0005 &&
            Math.abs(zone.y2 - next.y2) < 0.0005
          )
        })
      return unchanged ? current : zones
    })
  }, [containerRef, elementRefs])

  const scheduleCompute = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      timerRef.current = null
      compute()
    }, 100)
  }, [compute])

  useEffect(() => {
    if (!enabled) return undefined

    compute()
    const resizeObserver = new ResizeObserver(scheduleCompute)
    const mutationObserver = new MutationObserver(scheduleCompute)
    const container = containerRef.current
    if (container) resizeObserver.observe(container)

    elementRefs.forEach((ref) => {
      const element = ref?.current
      if (!element) return
      resizeObserver.observe(element)
      mutationObserver.observe(element, {
        characterData: true,
        childList: true,
        subtree: true,
      })
    })

    window.addEventListener('resize', scheduleCompute)
    window.addEventListener('orientationchange', scheduleCompute)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', scheduleCompute)
      window.removeEventListener('orientationchange', scheduleCompute)
    }
  }, [compute, containerRef, elementRefs, enabled, scheduleCompute])

  return deadZones
}
