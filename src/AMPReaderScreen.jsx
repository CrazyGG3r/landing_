import { useEffect, useMemo, useRef, useState } from 'react'
import '../dist-runtime/amp-reader.css'
import { projectDocumentUrl } from './portfolio/vhsProjects'

// This screen is hosted inside the ScreenSurface iframe as `/__vhs_screen?p=<id>`,
// where <id> is the AMP project selected by the clicked VHS tape (see EntryScene /
// vhsProjects.js). Read that id here and load the matching served document; fall
// back to AMProj1 when unspecified or malformed.
function useProjectDocumentSrc() {
  return useMemo(() => {
    let projectId = 'AMProj1'
    try {
      const p = new URLSearchParams(window.location.search).get('p')
      if (p && /^[A-Za-z0-9_-]+$/.test(p)) projectId = p
    } catch { /* window/search unavailable — keep default */ }
    return projectDocumentUrl(projectId)
  }, [])
}

export default function AMPReaderScreen() {
  const hostRef = useRef(null)
  const [startupError, setStartupError] = useState(null)
  const AMP_DOCUMENT_SRC = useProjectDocumentSrc()

  useEffect(() => {
    let disposed = false
    let reader = null

    import('../dist-runtime/amp-reader.js')
      .then(({ mountAMPReader }) => {
        if (disposed || !hostRef.current) return

        reader = mountAMPReader(hostRef.current, {
          src: AMP_DOCUMENT_SRC,
          ariaLabel: 'Portfolio project reader',
        })
      })
      .catch((error) => {
        if (!disposed) {
          setStartupError(error instanceof Error ? error : new Error(String(error)))
        }
      })

    return () => {
      disposed = true
      reader?.unmount()
    }
  }, [AMP_DOCUMENT_SRC])

  return (
    <main
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#fff',
        color: '#18191b',
      }}
    >
      <div ref={hostRef} style={{ width: '100%', minHeight: '100vh' }} />

      {startupError && (
        <div
          role="alert"
          style={{
            position: 'fixed',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            padding: 24,
            background: '#fff1f1',
            color: '#9f2424',
            font: '16px/1.5 system-ui, sans-serif',
            textAlign: 'center',
          }}
        >
          <div>
            <strong style={{ display: 'block', marginBottom: 8 }}>
              Unable to start the portfolio reader
            </strong>
            <span>{startupError.message}</span>
          </div>
        </div>
      )}
    </main>
  )
}
