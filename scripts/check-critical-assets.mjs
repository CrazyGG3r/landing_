import { stat } from 'node:fs/promises'
import { resolve } from 'node:path'

const budgets = [
  ['public/scenes/vhs/InitialScene.glb', 512 * 1024],
  ['public/scenes/vhs/EntryScene.glb', 512 * 1024],
  ['public/models/vhs/VHSUnit.performance.glb', 2 * 1024 * 1024],
  ['public/models/vhs/VHSUnit.high.glb', 4 * 1024 * 1024],
  ['public/models/vhs/masks/VHS_PrimaryMask.png', 512 * 1024],
  ['public/models/vhs/masks/VHS_SecondaryMask.png', 512 * 1024],
]

const failures = []

for (const [assetPath, maximumBytes] of budgets) {
  try {
    const asset = await stat(resolve(assetPath))
    if (asset.size > maximumBytes) {
      failures.push(
        `${assetPath} is ${(asset.size / 1024 / 1024).toFixed(2)} MB; budget is ${(maximumBytes / 1024 / 1024).toFixed(2)} MB`,
      )
    }
  } catch {
    failures.push(`${assetPath} is missing`)
  }
}

if (failures.length) {
  console.error(`Critical asset check failed:\n- ${failures.join('\n- ')}`)
  process.exitCode = 1
} else {
  console.log(`Critical asset check passed (${budgets.length} assets).`)
}
