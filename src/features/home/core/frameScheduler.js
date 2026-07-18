const subscribers = new Set()

let frameId = 0
let listeningForVisibility = false

function scheduleFrame() {
  if (
    frameId ||
    subscribers.size === 0 ||
    typeof window === 'undefined' ||
    (typeof document !== 'undefined' && document.hidden)
  ) {
    return
  }

  frameId = window.requestAnimationFrame(runFrame)
}

function runFrame(now) {
  frameId = 0
  if (typeof document !== 'undefined' && document.hidden) return

  subscribers.forEach((subscriber) => {
    const minimumInterval = subscriber.fps > 0 ? 1000 / subscriber.fps : 0
    if (
      minimumInterval > 0 &&
      subscriber.lastFrame > 0 &&
      now - subscriber.lastFrame < minimumInterval
    ) {
      return
    }

    subscriber.lastFrame = now
    try {
      subscriber.callback(now)
    } catch (error) {
      subscribers.delete(subscriber)
      console.warn('An animation task was disabled after an error.', error)
    }
  })

  updateVisibilityListener()
  scheduleFrame()
}

function handleVisibilityChange() {
  if (document.hidden) {
    if (frameId) window.cancelAnimationFrame(frameId)
    frameId = 0
    return
  }

  subscribers.forEach((subscriber) => {
    subscriber.lastFrame = 0
  })
  scheduleFrame()
}

function updateVisibilityListener() {
  if (typeof document === 'undefined') return

  if (subscribers.size > 0 && !listeningForVisibility) {
    document.addEventListener('visibilitychange', handleVisibilityChange)
    listeningForVisibility = true
  } else if (subscribers.size === 0 && listeningForVisibility) {
    document.removeEventListener('visibilitychange', handleVisibilityChange)
    listeningForVisibility = false
  }
}

export function subscribeFrame(callback, { fps = 0 } = {}) {
  const subscriber = {
    callback,
    fps: Number.isFinite(fps) ? Math.max(0, fps) : 0,
    lastFrame: 0,
  }

  subscribers.add(subscriber)
  updateVisibilityListener()
  scheduleFrame()

  return () => {
    subscribers.delete(subscriber)
    updateVisibilityListener()

    if (subscribers.size === 0 && frameId) {
      window.cancelAnimationFrame(frameId)
      frameId = 0
    }
  }
}
