const steppedClocks = new Map()

function subscribeToClock(fps, listener) {
  const rate = Math.max(1, fps)
  let clock = steppedClocks.get(rate)
  if (!clock) {
    clock = { listeners: new Set(), timer: 0 }
    steppedClocks.set(rate, clock)
  }
  clock.listeners.add(listener)

  const tick = () => {
    if (clock.listeners.size === 0) {
      steppedClocks.delete(rate)
      return
    }
    const now = performance.now()
    clock.listeners.forEach((callback) => callback(now))
    if (clock.listeners.size > 0) clock.timer = window.setTimeout(tick, 1000 / rate)
    else {
      clock.timer = 0
      steppedClocks.delete(rate)
    }
  }
  if (!clock.timer) clock.timer = window.setTimeout(tick, 1000 / rate)

  return () => {
    clock.listeners.delete(listener)
    if (clock.listeners.size === 0) {
      window.clearTimeout(clock.timer)
      steppedClocks.delete(rate)
    }
  }
}

export function subscribeSteppedAnimation({ duration = 900, fps = 12, loop = true, paused = false }, listener) {
  listener(0)
  if (paused) return () => {}
  let elapsed = 0
  let previous = performance.now()
  let unsubscribe = () => {}
  const tick = (now) => {
    if (document.hidden) {
      previous = now
      return
    }
    elapsed += Math.max(0, now - previous)
    previous = now
    const progress = loop ? (elapsed % duration) / duration : Math.min(elapsed / duration, 1)
    listener(progress)
    if (!loop && progress >= 1) unsubscribe()
  }
  unsubscribe = subscribeToClock(fps, tick)
  return unsubscribe
}

export function easeOutBack(value, overshoot = 1.7) {
  const shifted = value - 1
  return 1 + (overshoot + 1) * shifted ** 3 + overshoot * shifted ** 2
}

export function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}
