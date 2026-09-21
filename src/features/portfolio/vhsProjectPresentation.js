// Presentation metadata shared by the isolated asset lab and the production
// portfolio. Entries are keyed by the same zero-based VHS index used by
// vhsProjects.js, VHSInstances, and the reader transition.
export const VHS_PROJECT_PRESENTATION = [
  {
    id: '01',
    title: 'Signal / Break',
    type: 'Interactive direction',
    accent: '#f01924',
    support: '#ffe600',
    note: 'Identity in motion',
    tags: ['Interactive', 'Identity', 'Motion'],
    detail: 'A kinetic identity system built around interruption, impact and controlled visual noise.',
    detailImage: '/images/portfolio/vhs-details/signal-break.svg',
  },
  {
    id: '02',
    title: 'After Image',
    type: 'Digital experience',
    accent: '#eb16c7',
    support: '#7555ff',
    note: 'A synthetic memory',
    tags: ['Digital', 'Spatial', 'Synthetic'],
    detail: 'An interface study where memory persists as color, displaced motion and responsive spatial echoes.',
    detailImage: '/images/portfolio/vhs-details/after-image.svg',
  },
  {
    id: '03',
    title: 'Wild Type',
    type: 'Campaign system',
    accent: '#ff3b18',
    support: '#14d9eb',
    note: 'Words with teeth',
    tags: ['Campaign', 'Type', 'Direction'],
    detail: 'A campaign language driven by aggressive typography, modular disruption and expressive scale.',
    detailImage: '/images/portfolio/vhs-details/wild-type.svg',
  },
]

export function resolveVhsProjectPresentation(vhsIndex) {
  const index = Number.isInteger(vhsIndex) && vhsIndex >= 0 ? vhsIndex : 0
  return VHS_PROJECT_PRESENTATION[index] ?? {
    id: String(index + 1).padStart(2, '0'),
    title: `Archive ${String(index + 1).padStart(2, '0')}`,
    type: 'Selected work',
    accent: '#f01924',
    support: '#ffe600',
    note: 'Project archive',
    tags: ['Direction', 'Design', 'Motion'],
    detail: 'Project details are being prepared for this archive entry.',
    detailImage: null,
  }
}
