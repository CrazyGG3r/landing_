// Manual focus and navigation targets for the portfolio interactive objects.
// `scrollPercent` uses the visible scroll progression: 0 = start, 100 = end.
// Leave `scrollPercent` as `null` to use the automatic nearest-camera-path target.
// Set `routePath` to any route from App.jsx, for example "/blur" or "/assignment/research".
// Leave `routePath` as `null` if that object should focus only and not navigate.
export const INTERACTIVE_OBJECT_SCROLL_TARGETS = [
  { id: 1, scrollPercent: 0, routePath: '/a' },
  { id: 2, scrollPercent: 14.84, routePath: '/b' },
  { id: 3, scrollPercent: 34.63, routePath: '/c' },
  { id: 4, scrollPercent: 45.39, routePath: '/d' },
  { id: 5, scrollPercent: 58.75, routePath: '/e' },
  { id: 6, scrollPercent: 66.89, routePath: '/f' },
  { id: 7, scrollPercent: 77.72, routePath: '/g' },
  { id: 8, scrollPercent: 98.72, routePath: '/h' },
  { id: 9, scrollPercent: 31.58, routePath: '/i' },
  { id: 10, scrollPercent: 71.26, routePath: '/j' },
  { id: 11, scrollPercent: 81.91, routePath: '/k' },
]
