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
    setDeadZones(zones)
  }, [containerRef, elementRefs])

  const scheduleCompute = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(compute, 100)
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
      clearTimeout(timerRef.current)
      resizeObserver.disconnect()
      mutationObserver.disconnect()
      window.removeEventListener('resize', scheduleCompute)
      window.removeEventListener('orientationchange', scheduleCompute)
    }
  }, [compute, containerRef, elementRefs, enabled, scheduleCompute])

  return deadZones
}
