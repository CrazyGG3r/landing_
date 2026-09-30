import assert from 'node:assert/strict'
import test from 'node:test'
import { compatibleVideoSource, isIOSDevice } from './clientCapabilities.js'

const iphone = { userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', platform: 'iPhone', maxTouchPoints: 5 }
const ipadDesktopMode = { userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', platform: 'MacIntel', maxTouchPoints: 5 }
const desktop = { userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)', platform: 'Win32', maxTouchPoints: 0 }

test('detects iPhone and iPadOS desktop-mode user agents', () => {
  assert.equal(isIOSDevice(iphone), true)
  assert.equal(isIOSDevice(ipadDesktopMode), true)
  assert.equal(isIOSDevice(desktop), false)
})

test('uses matching MOV media on iOS and WebM elsewhere', () => {
  const source = '/takezo/skillset/technical/CrabRig.webm'
  assert.equal(compatibleVideoSource(source, iphone), '/takezo/skillset/technical/CrabRig.mov')
  assert.equal(compatibleVideoSource(source, desktop), source)
})

test('keeps unmatched WebM sources as safe fallbacks', () => {
  const source = '/takezo/showcase/projects/videos/thumbnails/Polycrate.webm'
  assert.equal(compatibleVideoSource(source, iphone), source)
})
